import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import classes from "../styles/Home.module.css";
import { getImagesActions } from "../redux/actions/imageActions";
import Head from "next/head";

const Home = () => {
  const history = useRouter();
  const dispatch = useDispatch();
  const default_images = 10;

  //makes new page to always start from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getImagesActions());
  }, [dispatch]);

  const {
    loading,
    error,
    images,
    success,
    message,
    total = 38,
  } = useSelector((state) => state.all_images);

  //per column for desktop
  const numImagePerColD = Math.ceil(total / 4);

  //per column for mobile
  const numImagePerColM = Math.ceil(total / 2);

  const imageHandler = (imageId) => {
    history.push(`/images/${imageId}`);
  };

  const searchHandler = (e) => {
    e.preventDefault();

    //unfinish
  };

  return (
    <>
      <Head>
        <title>PicPik | Home</title>
      </Head>

      <section className={classes.Home}>
        <div className={classes.hero}>
          <div className={classes.heroContent}>
            <h1 className={["text-light", classes.logo].join(" ")}>PicPik</h1>
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
            <div className="container">
              <div className={[classes.images, classes.desktop].join(" ")}>
                <div className={classes.column}>
                  {images.slice(0, numImagePerColD).map((img) => (
                    <div
                      key={img._id}
                      className={classes.imageContainer}
                      onClick={() => imageHandler(img._id)}
                    >
                      <img src={img.url} alt={img.name} />
                    </div>
                  ))}
                </div>
                <div className={classes.column}>
                  {images
                    .slice(numImagePerColD, numImagePerColD * 2)
                    .map((img) => (
                      <div
                        key={img._id}
                        className={classes.imageContainer}
                        onClick={() => imageHandler(img._id)}
                      >
                        <img src={img.url} alt={img.name} />
                      </div>
                    ))}
                </div>
                <div className={classes.column}>
                  {images
                    .slice(numImagePerColD * 2, numImagePerColD * 3)
                    .map((img) => (
                      <div
                        key={img._id}
                        className={classes.imageContainer}
                        onClick={() => imageHandler(img._id)}
                      >
                        <img src={img.url} alt={img.name} />
                      </div>
                    ))}
                </div>
                <div className={classes.column}>
                  {images
                    ?.slice(numImagePerColD * 3, numImagePerColD * 4)
                    .map((img) => (
                      <div
                        key={img._id}
                        className={classes.imageContainer}
                        onClick={() => imageHandler(img._id)}
                      >
                        <img src={img.url} alt={img.name} />
                      </div>
                    ))}
                </div>
              </div>

              <div className={[classes.images, classes.mobile].join(" ")}>
                <div className={classes.column}>
                  {images.slice(0, numImagePerColM).map((img) => (
                    <div
                      key={img._id}
                      className={classes.imageContainer}
                      onClick={() => imageHandler(img._id)}
                    >
                      <img src={img.url} alt={img.name} />
                    </div>
                  ))}
                </div>
                <div className={classes.column}>
                  {images
                    ?.slice(numImagePerColM, numImagePerColM * 2)
                    .map((img) => (
                      <div
                        key={img._id}
                        className={classes.imageContainer}
                        onClick={() => imageHandler(img._id)}
                      >
                        <img src={img.url} alt={img.name} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
