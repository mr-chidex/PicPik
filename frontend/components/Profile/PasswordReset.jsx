import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Alerts from "../Alerts";
import { resetPasswordAction } from "../../redux/actions/profileActions";

const PasswordReset = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [alerts, setAlerts] = useState(false);

  const dispatch = useDispatch();
  const { loading, success, message, error } = useSelector(
    (state) => state.passwordReset
  );

  const passwordResetHandler = async (e) => {
    e.preventDefault();

    dispatch(resetPasswordAction(currentPassword, newPassword));
    setAlerts(true);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <section className="container">
      <div className="w-75 mx-auto my-4">
        {alerts && (error || success) && (
          <Alerts message={message} type={error ? "danger" : "success"} />
        )}
        <form onSubmit={passwordResetHandler}>
          <div className="form-group">
            <label htmlFor="oldPws">Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-control"
              id="oldPws"
              name="oldPws"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPws">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="newPws"
              name="newPws"
            />
          </div>

          {loading ? (
            <button className="btn btn-primary" disabled>
              Resetting...
            </button>
          ) : (
            <button className="btn btn-primary">Change Password</button>
          )}
        </form>
      </div>
    </section>
  );
};

export default PasswordReset;
