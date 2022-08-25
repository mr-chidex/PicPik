import React from "react";
import { useRouter } from "next/router";

import classes from "../styles/Home.module.css";
import Head from "next/head";
import dexSplash from "../dexSplash";

export const getServerSideProps = async () => {
  const { data } = await dexSplash.get("/images");
  return {
    props: {
      images: data?.images || [],
      total: data?.total || 1,
    },
  };
};

const Home = ({ images, total }) => {
  const router = useRouter();

  const numImagePerColD = Math.ceil(total / 4);

  const imageHandler = (imageId) => {
    router.push(`/images/${imageId}`);
  };

  const searchHandler = (e) => {
    e.preventDefault();

    //unfinish
  };

  return (
    <>
      <Head>
        <title>PicPik | A place for all</title>
        <meta name="description" content="get quality images for your use" />
        <meta name="keywords" content="image, download" />
      </Head>

      <main className={classes.Home}>
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
          {images && (
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
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
