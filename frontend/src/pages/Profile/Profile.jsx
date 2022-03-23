import React, { useEffect } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/Profile.css";
import userIcon from "../../assets/images/userIcon.png";
import UpdateProfile from "./UpdateProfile";
import UploadImage from "./UploadImage";
import PasswordReset from "./PasswordReset";

const Profile = () => {
  const history = useHistory();
  const location = useLocation();

  //makes new page to always start from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useSelector((state) => state.userLogin);

  const images = user.images;

  const imageHandler = (imageId, image_id) => {
    history.push(`/images/${imageId}?image_id=${image_id}`);
  };

  return (
    <section className="container ">
      <section className="profile ">
        <div className="row ">
          <div className="col-sm-12 col-md-3 my-4">
            <div className="profile-image">
              <img
                src={user.image ? user.image : userIcon}
                alt={user.firstname}
              />
            </div>
            <div className="my-2">
              <Link to="/profile"> Profile</Link>
            </div>
            <div className="my-2">
              <Link to="/profile/update">Update Profile</Link>
            </div>
            <div>
              <Link to="/profile/upload-image">Upload Image</Link>
            </div>
            <div className="my-2">
              <Link to="/profile/password-reset">Change Password</Link>
            </div>
          </div>

          <div className="col-sm-12 col-md-9">
            <div className="jumbotron my-4 ">
              <h5 className="text-center">
                Welcome {user.firstname} {user.lastname}
              </h5>
              <p className="lead text-center">Email: {user.email}</p>
            </div>
            <Route path="/profile/update" component={UpdateProfile} />
            <Route path="/profile/upload-image" component={UploadImage} />
            <Route path="/profile/password-reset" component={PasswordReset} />
          </div>
        </div>

        {location.pathname === "/profile" && (
          <div>
            <h3 className="my-5 border-bottom text-muted">Photos</h3>
            {images.length === 0 && <p>No Photos</p>}
            <div className="images">
              {images.map((img, ind) => (
                <div
                  key={img._id || ind}
                  className="image-container"
                  onClick={() => imageHandler(img._id, img.image_id)}
                >
                  <img src={img.url} alt="" />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default Profile;
