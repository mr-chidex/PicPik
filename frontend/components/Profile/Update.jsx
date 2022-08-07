import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { generateBase64FromImage } from "../../utils/image";
import Alerts from "../Alerts";

import { updateProfileAction } from "../../redux/actions/profileActions";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.userLogin);

  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastName] = useState(user.lastname);
  const [imagePreview, setImagePreview] = useState("");
  const [alerts, setAlerts] = useState(false);

  let image = useRef("");
  const dispatch = useDispatch();

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    dispatch(updateProfileAction(firstname, lastname, image));
    setAlerts(true);
  };

  const imageChangeHandler = async () => {
    const imagepreview = await generateBase64FromImage(image.current.files[0]);
    setImagePreview(imagepreview);
  };

  const { loading, error, message, success } = useSelector(
    (state) => state.updatedProfile
  );

  const removeImage = () => {
    image.current.value = "";
    setImagePreview("");
  };

  return (
    <section className="container">
      <div className="w-75 mx-auto my-4">
        {alerts && (error || success) && (
          <Alerts message={message} type={error ? "danger" : "success"} />
        )}
        <form onSubmit={updateProfileHandler}>
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              id="firstname"
              name="firstname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              id="lastname"
              name="lastname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Profile Photo:</label>
            <input
              type="file"
              ref={image}
              onChange={imageChangeHandler}
              className="form-control"
              id="image"
              name="image"
            />
          </div>
          <div className=" form-group w-50">
            <img src={imagePreview} className="img-fluid w-50" alt="" />
            <div className="mt-2">
              {imagePreview && (
                <button className="btn btn-danger btn-sm" onClick={removeImage}>
                  Remove
                </button>
              )}
            </div>
          </div>
          {loading ? (
            <button className="btn btn-primary" disabled>
              Updating...
            </button>
          ) : (
            <button className="btn btn-primary">Update</button>
          )}
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
