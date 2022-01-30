import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userLogoutAction } from "../redux/actions/userActions";
import userIcon from "../assets/images/userIcon.png";
import "./styles/Header.css";

const Header = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  const submitPhotoHandler = () => {
    user ? history.push("/profile/upload-image") : history.push("/signin");
  };

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link className="navbar-brand logo" to="/">
          PicPik
        </Link>
        {/* <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form> */}
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
            {/* <li className="nav-item">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
                onClick={submitPhotoHandler}
              >
                Submit a photo
              </button>
            </li> */}
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Signin <span className="sr-only">(signin)</span>
                </Link>
              </li>
            )}

            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <div className="user-image" title="profile">
                    <img src={user.image ? user.image : userIcon} alt="" />
                  </div>
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
