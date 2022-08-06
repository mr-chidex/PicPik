import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { userLogoutAction } from "../redux/actions/userActions";

const Header = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  const submitPhotoHandler = () => {
    user ? router.push("/profile/upload-image") : router.push("/signin");
  };

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link href="/">
          <a className="navbar-brand logo"> PicPik</a>
        </Link>

        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          onClick={submitPhotoHandler}
        >
          Submit a photo
        </button>
        <button
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
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
