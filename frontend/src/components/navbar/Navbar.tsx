import React from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../context/authenication-context";

function Navbar() {
  const { isAuthenticated, logOut }: any = useAuthentication();
  const navigate = useNavigate();
  const matchPath = useMatch({
    path: "/dashboard",
  });

  const clickedLogout = () => {
    logOut();
    navigate("/", { replace: true });
  };

  const showHomeButton = isAuthenticated && (
    <>
      <Link
        className="btn btn-outline-success my-2 my-sm-0 mx-2"
        to="/dashboard"
      >
        Home
      </Link>
      <button
        className="btn btn-outline-danger my-2 my-sm-0"
        onClick={clickedLogout}
      >
        Logout
      </button>
    </>
  );

  const getPasswordManagerFreeButton = !matchPath && (
    <Link className="btn btn-outline-warning my-2 my-sm-0" to="create-account">
      Get Password Manager Free
    </Link>
  );

  return (
    <nav className=" navbar-light" style={{ backgroundColor: "#0a4275" }}>
      <div className="navbar navbar-expand-lg mx-3">
        <Link to="/" className="navbar-brand text-white">
          Password Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="my-2 my-lg-0 ms-auto">
            {showHomeButton}
            {getPasswordManagerFreeButton}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
