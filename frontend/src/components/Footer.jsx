import React from "react";

import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer border-top">
      <p className="text-center  mt-2">
        Designed by{" "}
        <a
          href="http://www.github.com/mr-chidex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Mr-Chidex</strong>
        </a>{" "}
        &copy; copyright 2021 - All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
