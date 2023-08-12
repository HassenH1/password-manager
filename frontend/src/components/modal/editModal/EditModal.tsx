import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const charSet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={}[]|:;/?.>,<";

function EditModal({ data }: { data: any }) {
  const [selectedOption, setSelectedOption] = useState("15");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      website: data ? data.website : "",
      username: data ? data.username : "",
      password: data ? data.password : "",
    },
    validationSchema: Yup.object({
      website: Yup.string()
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Enter valid url"
        )
        .required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (value) => {},
  });

  const settingPassword = () => {
    let randomString = "";
    for (let i = 0; i < Number(selectedOption); i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    formik.setFieldValue("password", randomString);
  };

  const saveNewPassword = () => {};

  return (
    <div
      className="modal fade"
      id="editModal"
      role="dialog"
      aria-labelledby="editModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Edit Password
            </h5>
          </div>
          <div className="modal-body">
            <label>Website:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                placeholder="www.passwordmanager.com"
                id="basic-url-2"
                aria-describedby="basic-addon3"
                className={`form-control ${
                  formik.touched.website &&
                  formik.errors.website &&
                  "is-invalid"
                }`}
                name="website"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.website}
              />
            </div>
            <label>Username or email:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                placeholder="username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                className={`form-control ${
                  formik.touched.username &&
                  formik.errors.username &&
                  "is-invalid"
                }`}
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </div>
            <label>Password:</label>
            <div className="input-group mb-3">
              <input
                type="password"
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon1"
                disabled
                className={`form-control ${
                  formik.touched.password &&
                  formik.errors.password &&
                  "is-invalid"
                }`}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
              <button
                type="button"
                className="btn btn-warning"
                onClick={settingPassword}
              >
                generate!
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => formik.resetForm()}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={saveNewPassword}
              data-bs-dismiss="modal"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
