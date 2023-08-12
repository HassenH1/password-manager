import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import authenticationService from "../../store/authentication";
import { useAuthentication } from "../../context/authenication-context";
import localForage from "localforage";
import utils from "../../util/utils";
import Button from "../../components/base/button/Button";
import Input from "../../components/base/input/Input";

/**
 * Component for sign on.
 *
 * @component
 * @example
 * const searchInput = google
 * return (
 *   <Signin />
 * )
 * @returns     {JSX.Element}
 */
function Signin() {
  const navigate = useNavigate();
  const { logIn }: any = useAuthentication();
  const [error, setError] = useState<any>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await authenticationService.login(values);

        if (!response.access_token) {
          setError(
            response.message ||
              response.errors.map((err: { [key: string]: string }) => err.msg)
          );
          return;
        }

        const localForageValue = await localForage.setItem(
          "authentication",
          response
        );

        if (utils.isEmptyObj(localForageValue)) {
          setError("Having trouble login in, please try again later");
          return;
        }

        await logIn();
        navigate("/dashboard"); //might need to remove this
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 12000);
  }, [error]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-sm-6 text-black"
          style={{ backgroundColor: "#f9fbfd" }}
        >
          <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
            <form style={{ width: "23rem" }} onSubmit={formik.handleSubmit}>
              <>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Log in
                </h3>
                {error && (
                  <div className="fw-normal text-center text-danger">
                    {error}
                  </div>
                )}
                <div className="form-outline mb-4">
                  <label className="form-label">Email address</label>
                  {/* <input
                    id="email"
                    type="email"
                    className={`form-control form-control-lg ${
                      formik.touched.email &&
                      formik.errors.email &&
                      "is-invalid"
                    }`}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  /> */}
                  <Input
                    id="email"
                    className={`form-control form-control-lg ${
                      formik.touched.email &&
                      formik.errors.email &&
                      "is-invalid"
                    }`}
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : (
                    <div className="mb-5" />
                  )}
                </div>

                <div className="form-outline">
                  <label className="form-label">Password</label>
                  {/* <input
                    id="password"
                    type="password"
                    className={`form-control form-control-lg ${
                      formik.touched.password &&
                      formik.errors.password &&
                      "is-invalid"
                    }`}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  /> */}
                  <Input
                    id="password"
                    type="password"
                    className={`form-control form-control-lg ${
                      formik.touched.password &&
                      formik.errors.password &&
                      "is-invalid"
                    }`}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : (
                    <div className="mb-5" />
                  )}
                </div>

                <div className="pt-1 mb-4 mt-4">
                  {/* <button
                    type="submit"
                    className="btn btn-info btn-lg btn-block w-100 text-white"
                    disabled={formik.isSubmitting}
                  >
                    Log in
                  </button> */}
                  <Button
                    className="btn btn-info btn-lg btn-block w-100 text-white"
                    disabled={formik.isSubmitting}
                    name="Log in"
                    type="submit"
                  />
                </div>

                <p className="small pb-lg-2">
                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </p>
                <p>
                  Don't have an account?{" "}
                  <Link to="/create-account" className="link-info">
                    Register Here
                  </Link>
                </p>
              </>
            </form>
          </div>
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="https://images.unsplash.com/photo-1597402483906-5ef5ff9bdf51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt="Signin"
            className="w-100 vh-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
