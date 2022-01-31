import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Alerts from "../../components/Alerts";
import { uploadNewImage } from "../../redux/actions/profileActions";
import { generateBase64FromImage } from "../../utils/image";

const UploadImage = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [alerts, setAlerts] = useState(false);

  //makes new page to always start from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const image = useRef("");
  const dispatch = useDispatch();

  const upladImageHandler = async (e) => {
    e.preventDefault();

    dispatch(uploadNewImage(image));
    setAlerts(true);
  };

  const imageChangeHandler = async () => {
    const imagepreview = await generateBase64FromImage(image.current.files[0]);
    setImagePreview(imagepreview);
  };

  const { loading, error, message, success } = useSelector(
    (state) => state.newImage
  );

  const removeImage = () => {
    image.current.value = "";
    setImagePreview("");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto my-4">
        {alerts && (error || success) && (
          <Alerts message={message} type={error ? "danger" : "success"} />
        )}
        <form onSubmit={upladImageHandler}>
          <div className="form-group">
            <label htmlFor="image">
              Upload Image <small>Max(500kb)</small>:{" "}
            </label>
            <input
              type="file"
              onChange={imageChangeHandler}
              className="form-control"
              id="image"
              name="image"
              ref={image}
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
              Uploading...
            </button>
          ) : (
            <button className="btn btn-primary">Upload Image</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
