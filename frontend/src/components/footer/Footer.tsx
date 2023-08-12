import React from "react";

function Footer() {
  return (
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#0a4275" }}
    >
      <div className="container p-4 pb-0"></div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright - Password Manager
      </div>
    </footer>
  );
}

export default Footer;
