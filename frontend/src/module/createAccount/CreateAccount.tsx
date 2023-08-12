import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import * as Yup from "yup";
import authenticationService from "../../store/authentication";

function Content() {
  const navigate = useNavigate();
  const [error, setError] = useState<null | string>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      fullName: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await authenticationService.signup(values);
        console.log(response, "<=========RESPONSE?");
        if (response.errors || response?.errors?.length > 0) {
          setError(
            response.message ||
              response.errors.map((err: { [key: string]: string }) => err.msg)
          );
          return;
        }
        navigate("/login");
      } catch (error) {
        throw new Error(`${error} inside createAccount onSubmit method`);
      }
    },
  });

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const confirmPasswordResult = zxcvbn(formik.values.password);

  const handlePasswordConfirmInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setPasswordConfirm(e.target.value);

  const createPasswordLabel = (result: { score: number }) => {
    switch (result.score) {
      case 0:
        return "Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 9000);
    }
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
              <h3
                className="fw-normal mb-3 pb-3 text-center"
                style={{ letterSpacing: "1px" }}
              >
                Sign up
              </h3>
              {error && (
                <div className="fw-normal text-center text-danger">{error}</div>
              )}

              <div className="form-outline mb-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`form-control form-control-lg ${
                    formik.touched.email && formik.errors.email && "is-invalid"
                  }`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : (
                  <div className="mb-4" />
                )}
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Full Name</label>
                <input
                  type="name"
                  name="fullName"
                  className={`form-control form-control-lg ${
                    formik.touched.fullName &&
                    formik.errors.fullName &&
                    "is-invalid"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-danger">{formik.errors.fullName}</div>
                ) : (
                  <div className="mb-4" />
                )}
              </div>

              <div className="form-outline">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  id="form2Example29"
                  className={`form-control form-control-lg ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "is-invalid"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : (
                  <div className="mb-4" />
                )}
              </div>

              <div className="mb-4 d-flex justify-content-between align-items-center">
                <progress value={confirmPasswordResult.score} max="4" />
                <label className="">
                  {formik.values.password && (
                    <>
                      <strong style={{ fontSize: 13 }}>
                        Password strength:
                      </strong>{" "}
                      <span style={{ fontSize: 13 }}>
                        {createPasswordLabel(confirmPasswordResult)}
                      </span>
                    </>
                  )}
                </label>
              </div>

              <div className="form-outline">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="form2Example28"
                  className="form-control form-control-lg"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmInput}
                />
              </div>

              {formik.values.password.length !== 0 &&
                passwordConfirm.length !== 0 &&
                formik.values.password !== passwordConfirm && (
                  <span style={{ color: "red" }}>Passwords don't match</span>
                )}

              <div className="pt-1 mb-4 mt-4">
                <button
                  className="btn btn-info btn-lg btn-block w-100 text-white"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="link-info">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="https://images.unsplash.com/photo-1597402483906-5ef5ff9bdf51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt="Login"
            className="w-100 vh-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Content;
