import React from "react";
import { Route, Routes } from "react-router-dom";
// import { DashboardHOC } from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";
import ProtectedRoutes from "./ProtectedRoutes";

/**
 * @todo - NEED TO REMOVE
 * @returns
 */
function AuthenticatedRouter() {
  return (
    <Routes>
      {/* <Route
        path="dashboard"
        element={<ProtectedRoutes Component={DashboardHOC} />}
      />
      <Route path="profile" element={<ProtectedRoutes Component={Profile} />} />
      <Route
        path="settings"
        element={<ProtectedRoutes Component={Settings} />}
      /> */}
    </Routes>
  );
}

export default AuthenticatedRouter;
