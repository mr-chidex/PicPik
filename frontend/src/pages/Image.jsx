import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { Grid } from "react-loader-spinner";

import "./styles/Image.css";
import { getImageActions } from "../redux/actions/imageActions";
import { deleteImageHandler } from "../redux/actions/profileActions";
import userIcon from "../assets/images/userIcon.png";
import Alerts from "../components/Alerts";

const Image = () => {
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  //makes new page to always start from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const query =
    location.search && location.search.split("=")
      ? location.search.split("=")[1]
      : "";

  useEffect(() => {
    dispatch(getImageActions(params.imageId));
  }, [dispatch, params.imageId]);

  const { loading, error, image, success, message } = useSelector(
    (state) => state.single_image
  );

  const {
    loading: deleteLoading,
    error: deleteError,
    message: deleteMessage,
    success: deleteSuccess,
  } = useSelector((state) => state.deleted_image);

  const delteImageHandler = () => {
    dispatch(deleteImageHandler(query));
    setAlerts(true);
  };

  useEffect(() => {
    //take user to profile page after deleting an image
    let timer;
    if (alerts && deleteSuccess) {
      timer = setTimeout(() => {
        history.push("/profile");
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [alerts, deleteSuccess, history]);

  return (
    <div className="container Image row mx-auto my-3">
      <div className="col-sm-3">
        <div className="author-image">
          {success && (
            <img
              src={image.author.image || userIcon}
              alt={`${image.author.firstname} ${image.author.lastname}`}
            />
          )}
        </div>
        {success && (
          <p>
            author's name: &nbsp;{image?.author?.firstname}{" "}
            {image?.author?.lastname}
          </p>
        )}
        {success && <p>author's email: {image?.author?.email}</p>}
        <div className="d-flex flex-column">
          {image?.url ? (
            <a href={image?.url} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-outline-success">
                <i
                  className="fa fa-download"
                  aria-hidden="true"
                  disabled={success}
                ></i>{" "}
                Download free
              </button>
            </a>
          ) : (
            <button className="btn btn-outline-success">
              <i className="fa fa-download" aria-hidden="true" disabled></i>{" "}
              Download free
            </button>
          )}
          <button className="btn btn-outline-primary" disabled>
            <i className="fa fa-thumbs-o-up"></i> Like
          </button>
          <button className="btn btn-outline-primary" disabled>
            <i className="fa fa-share" aria-hidden="true"></i> Share
          </button>
          <button className="btn btn-outline-info" disabled>
            <i className="fa fa-info-circle" aria-hidden="true"></i> Info
          </button>
          {query &&
            (deleteLoading ? (
              <button className="btn btn-outline-danger" disabled>
                <i className="fa fa-trash" aria-hidden="true"></i> Deleting...
              </button>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={delteImageHandler}
              >
                <i className="fa fa-trash" aria-hidden="true"></i> Delete
              </button>
            ))}
        </div>
      </div>
      <div className="image-container mx-auto col">
        {loading && (
          <div className="loading">
            <Grid heigth="100" width="100" color="grey" ariaLabel="loading" />
          </div>
        )}

        {error && (
          <div className={`alert alert-danger fade show`} role="alert">
            {message}
          </div>
        )}

        {alerts && (deleteError || deleteSuccess) && (
          <Alerts
            message={deleteMessage}
            type={deleteError ? "danger" : "success"}
          />
        )}
        {success && (
          <img
            className="img d-block mx-auto"
            src={image.url}
            alt={image.name}
          />
        )}
      </div>
    </div>
  );
};

export default Image;
