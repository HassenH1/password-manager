import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useAuthentication } from "../context/authenication-context";

const ProtectedRoutes = () => {
  const { isAuthenticated, checkAuth }: any = useAuthentication();
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const validate = async () => {
      try {
        setLoading(true);
        await checkAuth();
        setLoading(false);
      } catch (e: any) {
        throw new Error(e);
      }
    };
    validate();
  }, []);

  if (loading) return <Loading />;

  return !isAuthenticated ? (
    <Navigate to={"/login"} replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
