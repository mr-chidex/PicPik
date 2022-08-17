import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { userLogoutAction } from "../redux/actions/userActions";

const Header = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.userLogin);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
    router.replace("/");
  };

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const submitPhotoHandler = () => {
    user ? router.push("/profile") : router.push("/signin");
  };

  const submitPhotoHandlerMobile = () => {
    user ? router.push("/profile/upload-image") : router.push("/signin");
    toggleHandler();
  };

  return (
    <div className="Header">
      {toggle && <div onClick={toggleHandler} className="backdrop"></div>}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link href="/">
          <a className="navbar-brand logo"> PicPik</a>
        </Link>

        <button
          className="btn btn-outline-success my-2 my-sm-0 submit-photo_btn"
          type="button"
          onClick={submitPhotoHandler}
        >
          Submit a photo
        </button>
        <button
          onClick={toggleHandler}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <AnimatePresence>
          {toggle && (
            <motion.div
              className="slider"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              exit={{ opacity: 0, x: 300 }}
            >
              <span onClick={toggleHandler} className="cancel">
                X
              </span>
              <Link href="/">
                <a
                  onClick={toggleHandler}
                  className="navbar-brand logo logo-mobile"
                >
                  {" "}
                  PicPik
                </a>
              </Link>

              <div className="content">
                <button
                  className="btn btn-outline-success my-2 my-sm-0 "
                  type="button"
                  onClick={submitPhotoHandlerMobile}
                >
                  Submit a photo
                </button>
                <ul className="navbar-nav">
                  {!user && (
                    <li onClick={toggleHandler} className="nav-item">
                      <Link href="/signin">
                        <a className="nav-link">
                          Signin <span className="sr-only">(signin)</span>
                        </a>
                      </Link>
                    </li>
                  )}

                  {!user && (
                    <li onClick={toggleHandler} className="nav-item">
                      <Link href="/signup">
                        <a className="nav-link">Signup</a>
                      </Link>
                    </li>
                  )}
                  {user && (
                    <li onClick={toggleHandler} className="nav-item">
                      <Link href="/profile">
                        <a className="nav-link">
                          <div
                            className="user-image user-image_mobile"
                            title="profile"
                          >
                            <img
                              src={
                                user.image
                                  ? user.image
                                  : "/assets/images/userIcon.png"
                              }
                              alt=""
                            />
                          </div>
                        </a>
                      </Link>
                    </li>
                  )}

                  {user && (
                    <li onClick={toggleHandler} className="nav-item">
                      <span
                        className="nav-link "
                        style={{ cursor: "pointer" }}
                        onClick={logoutHandler}
                        tabIndex="-1"
                      >
                        Logout
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto" style={{ alignItems: "center" }}>
            {!user && (
              <li className="nav-item">
                <Link href="/signin">
                  <a className="nav-link">
                    Signin <span className="sr-only">(signin)</span>
                  </a>
                </Link>
              </li>
            )}

            {!user && (
              <li className="nav-item">
                <Link href="/signup">
                  <a className="nav-link">Signup</a>
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link href="/profile">
                  <a className="nav-link">
                    <div className="user-image" title="profile">
                      <img
                        src={
                          user.image
                            ? user.image
                            : "/assets/images/userIcon.png"
                        }
                        alt=""
                      />
                    </div>
                  </a>
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <span
                  className="nav-link "
                  style={{ cursor: "pointer" }}
                  onClick={logoutHandler}
                  tabIndex="-1"
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
