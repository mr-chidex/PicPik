import React from "react";

const Footer = () => {
  return (
    <footer style={{
      height: "10rem",
      display: "grid",
      placeItems: "center",
      background: "#ccc",
      marginTop: "2rem"
    }}
      className="footer border-top">
      <p className="text-center  mt-2">
        <small> Designed by&nbsp;</small>
        <a
          href="http://www.github.com/mr-chidex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Mr-Chidex</strong>
        </a>{" "}
        <small>
          &copy; copyright {new Date().getFullYear()} - All rights reserved
        </small>
      </p>
    </footer>
  );
};

export default Footer;
