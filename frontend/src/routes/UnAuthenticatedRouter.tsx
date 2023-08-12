import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";

/**
 * @todo - NEED TO REMOVE
 * @returns
 */
function UnAuthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="create-account" element={<Registration />} />
      <Route path="login" element={<Login />} />
      {/* <Route
          path="/*"
          element={
            <main
              style={{
                padding: "1rem",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>There's nothing here!</p>
            </main>
          }
        /> */}
    </Routes>
  );
}

export default UnAuthenticatedRouter;
