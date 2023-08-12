import React from "react";
import Logo from "../../img/password.svg";

function Header() {
  return (
    <div
      className="text-center bg-image"
      style={{
        backgroundImage: `url(${Logo})`,
        height: "400px",
      }}
    >
      <div
        className="mask h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">
            <h1
              className="mb-3"
              style={{ fontFamily: "Concert One", fontSize: 55 }}
            >
              Password Manager
            </h1>
            <h4 className="mb-3 mx-3" style={{ fontSize: 22 }}>
              Password Manager remembers all your passwords so you don't have
              to.
            </h4>
            {/* <a className="btn btn-outline-light btn-lg" href="#!" role="button">
              Call to action
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
