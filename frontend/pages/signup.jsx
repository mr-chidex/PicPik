import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import Alerts from "../components/Alerts";
import { userSignUpAction } from "../redux/actions/userActions";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading, userRegister, message, error } = useSelector(
    (state) => state.userSignup
  );

  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, []);

  const signupHandler = async (e) => {
    e.preventDefault();

    dispatch(userSignUpAction(firstname, lastname, email, password));
    setAlerts(true);
  };

  return (
    <>
      <Head>
        <title>PicPick | Sign up</title>
        <meta
          name="description"
          content="sign up to Pickpic to  upload and get quality images for your use"
        />
        <meta name="keywords" content="image, download, upload" />
      </Head>
      <main className="container">
        <div className="jumbotron">
          <h4 className="text-center text-muted">Signup to PicPik</h4>
        </div>
        <div className="w-75 mx-auto my-4">
          {alerts && (error || userRegister) && (
            <Alerts message={message} type={error ? "danger" : "success"} />
          )}
          <form onSubmit={signupHandler}>
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
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="email"
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <p>
              Already have an account?{" "}
              <Link href="/signin">
                <a>signin</a>
              </Link>{" "}
            </p>
            {loading ? (
              <button className="btn btn-primary" disabled>
                Signing up...
              </button>
            ) : (
              <button className="btn btn-primary">Signup</button>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;
