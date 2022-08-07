import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import { userSignInAction } from "../redux/actions/userActions";
import Alerts from "../components/Alerts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading, user, message, error } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  const signinHandler = (e) => {
    e.preventDefault();

    dispatch(userSignInAction(email, password));
    setAlerts(true);
  };

  return (
    <>
      <Head>
        <title>PicPick | Sign in</title>
      </Head>{" "}
      <Head>
        <title>PicPick | Sign in</title>
      </Head>
      <main className="container">
        <div className="jumbotron">
          <h4 className="text-center text-muted">Welcome Back &#128513;</h4>
        </div>
        <div className="w-75 mx-auto my-4">
          {alerts && error && (
            <Alerts message={message} type={error ? "danger" : "success"} />
          )}
          <div
            className="alert alert-info"
            style={{ textAlign: "center" }}
            role="alert"
          >
            <p>Don't need to signup to access dashboard.</p>
            <p>
              email : testuser@email.com &amp; password:
              <b> 11111</b>
            </p>
          </div>
          <form onSubmit={signinHandler}>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
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
              />
            </div>
            <p>
              Dont have an account yet?{" "}
              <Link href="/signup">
                <a>signup</a>
              </Link>
            </p>
            {loading ? (
              <button className="btn btn-primary" disabled>
                Signing in...
              </button>
            ) : (
              <button className="btn btn-primary">Signin</button>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
