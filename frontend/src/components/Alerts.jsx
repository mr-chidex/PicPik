import React, { useEffect, useState } from "react";

const Alerts = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {visible ? (
        <div className={`alert alert-${type}  fade show`} role="alert">
          {message}
        </div>
      ) : null}
    </>
  );
};

export default Alerts;
