import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
// import Dashboard, { DashboardHOC } from "../pages/dashboard/Dashboard";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Registration from "../pages/registration/Registration";
import Settings from "../pages/settings/Settings";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "../pages/notFound/NotFound";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Loading from "../components/loading/Loading";
import {
  IAuthContext,
  useAuthentication,
} from "../context/authenication-context";
import { DataProvider } from "../context/data-context";
import { useUser } from "../context/user-context";

/**
 * Routes to different paths.
 *
 * @component
 * @example
 * return (
 *   <InitialRoutes />
 * )
 * @returns     {React.Component}
 */
const InitialRoutes = () => {
  const auth = useAuthentication();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              auth?.isAuthenticated ? <Navigate to="/dashboard" /> : <Home />
            }
          />
          <Route
            path="create-account"
            element={
              auth?.isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Registration />
              )
            }
          />
          <Route
            path="login"
            element={
              auth?.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
            }
          />
          <Route path="/*" element={<NotFound />} />

          <Route element={<ProtectedRoutes />}>
            <Route
              path="/dashboard"
              element={
                <DataProvider>
                  <Dashboard />
                </DataProvider>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default InitialRoutes;
