import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";

import UpdateProfile from "../../components/Profile/Update";
import UpdateImage from "../../components/Profile/UploadImage";
import PasswordReset from "../../components/Profile/PasswordReset";
import useAuthentication from "../../hooks/useAuthentication";

const Profile = () => {
  useAuthentication();
  const router = useRouter();
  const [path, setPath] = useState("");

  const { user } = useSelector((state) => state.userLogin);

  const images = user?.images;

  const imageHandler = (imageId, image_id) => {
    router.push(`/images/${imageId}?image_id=${image_id}`);
  };

  return (
    <>
      <Head>
        <title>PicPik | Profile</title>
      </Head>

      <main className="container ">
        <section className="profile ">
          <div className="row ">
            <div className="col-sm-12 col-md-3 my-4">
              <div className="profile-image">
                <img
                  src={
                    user?.image ? user?.image : "/assets/images/userIcon.png"
                  }
                  alt={user?.firstname}
                />
              </div>
              <div className="my-2">
                <Link href="/profile">
                  <a onClick={() => setPath("")}>Profile</a>
                </Link>
              </div>
              <div className="my-2">
                <a
                  className="link"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPath("update")}
                >
                  Update Profile
                </a>
              </div>
              <div>
                <a
                  className="link"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPath("upload")}
                >
                  Upload Image
                </a>
              </div>
              <div className="my-2">
                <a
                  className="link"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPath("password")}
                >
                  Change Password
                </a>
              </div>
            </div>

            <div className="col-sm-12 col-md-9">
              <div className="jumbotron my-4 ">
                <h5 className="text-center">
                  Welcome {user?.firstname} {user?.lastname}
                </h5>
                <p className="lead text-center">Email: {user?.email}</p>
              </div>
              {path === "update" && <UpdateProfile />}
              {path === "upload" && <UpdateImage />}
              {path === "password" && <PasswordReset />}
            </div>
          </div>

          {path === "" && (
            <div>
              <h3 className="my-5 border-bottom text-muted">Photos</h3>
              {images?.length === 0 && <p>No Photos</p>}
              <div className="images">
                {images?.map((img, ind) => (
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
      </main>
    </>
  );
};

export default Profile;
