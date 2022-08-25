import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

import { deleteImageHandler } from "../../redux/actions/profileActions";
import Alerts from "../../components/Alerts";
import dexSplash from "../../dexSplash";

export const getServerSideProps = async (context) => {
  const imageId = context.params.id;

  const { data } = await dexSplash.get(`/images/${imageId}`);

  return {
    props: {
      image: data,
    },
  };
};

const Image = ({ image }) => {
  const [alerts, setAlerts] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userLogin);

  const {
    loading: deleteLoading,
    error: deleteError,
    message: deleteMessage,
    success: deleteSuccess,
  } = useSelector((state) => state.deleted_image);

  const delteImageHandler = () => {
    dispatch(deleteImageHandler(image?._id));
    setAlerts(true);
  };

  return (
    <>
      <Head>
        <title>PicPik | Image</title>
        <meta name="description" content="view and download images" />
        <meta name="keywords" content="image, download, upload" />
      </Head>

      <main className="container Image row mx-auto my-3">
        <div className="col-sm-3">
          <div className="author-image">
            <img
              src={image?.author?.image || "/assets/images/userIcon.png"}
              alt={`${image?.author?.firstname} ${image?.author?.lastname}`}
            />
          </div>

          <p>
            Author: &nbsp;{image?.author?.firstname} {image?.author?.lastname}
          </p>

          <div className="d-flex flex-column">
            {image?.url ? (
              <a href={image?.url} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-outline-success">
                  <i className="fa fa-download" aria-hidden="true"></i> Download
                </button>
              </a>
            ) : (
              <button className="btn btn-outline-success">
                <i className="fa fa-download" aria-hidden="true" disabled></i>{" "}
                Download
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
            {user &&
              user?.email === image?.author?.email &&
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
          {/* {loading && (
            <div className="loading">
              <Grid heigth="100" width="100" color="grey" ariaLabel="loading" />
            </div>
          )} */}
          {/* {error && (
            <div className={`alert alert-danger fade show`} role="alert">
              {message}
            </div>
          )} */}
          {alerts && (deleteError || deleteSuccess) && (
            <Alerts
              message={deleteMessage}
              type={deleteError ? "danger" : "success"}
            />
          )}

          <img
            className="img d-block mx-auto"
            src={image?.url}
            alt={image?.name}
          />
        </div>
      </main>
    </>
  );
};

export default Image;
