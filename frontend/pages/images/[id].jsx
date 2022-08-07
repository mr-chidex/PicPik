import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Grid } from "react-loader-spinner";

import { getImageActions } from "../../redux/actions/imageActions";
import { deleteImageHandler } from "../../redux/actions/profileActions";
import Alerts from "../../components/Alerts";
import Head from "next/head";

const Image = () => {
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { image_id, id } = router.query;

  //makes new page to always start from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getImageActions(id));
  }, [dispatch, id]);

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
    dispatch(deleteImageHandler(image_id));
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
    <>
      <Head>
        <title>PicPik | Image</title>
      </Head>

      <main className="container Image row mx-auto my-3">
        <div className="col-sm-3">
          <div className="author-image">
            {success && (
              <img
                src={image.author.image || "/assets/images/userIcon.png"}
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
            {image_id &&
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
      </main>
    </>
  );
};

export default Image;
