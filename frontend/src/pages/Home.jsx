import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles/Home.css";
import { getImagesActions } from "../redux/actions/imageActions";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const default_images = 10;

  //makes new page to always start from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getImagesActions());
  }, [dispatch]);

  const { loading, error, images, success, message } = useSelector(
    (state) => state.all_images
  );

  const imageHandler = (imageId) => {
    history.push(`/image/${imageId}`);
  };

  const searchHandler = (e) => {
    e.preventDefault();

    //unfinish
  };

  return (
    <section className="Home">
      <div className="hero ">
        <div className="hero-content ">
          <h1 className="text-light logo">PicPik</h1>
          <p>The internet source of free-usable-images</p>
          <p>Powered by creators everywhere.</p>
          <form onSubmit={searchHandler}>
            <div className="form-group">
              <i className="fa fa-search search" aria-hidden="true"></i>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Search free high-redolution photos"
              />
            </div>
          </form>
          <p>Trending: nature, wallpapers, backgrounds, tshirts, love</p>
        </div>
      </div>

      <div>
        {error && (
          <div className={`alert alert-danger fade show`} role="alert">
            {message}
          </div>
        )}

        {loading && (
          <div className="default-images container">
            {[...Array(default_images)].map((_, index) => (
              <div
                key={index}
                className="default-container animate-flicker"
              ></div>
            ))}
          </div>
        )}

        {success && (
          <div className="images container">
            {images.map((img) => (
              <div
                key={img._id}
                className="image-container"
                onClick={() => imageHandler(img._id)}
              >
                <img src={img.url} alt={img.name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
