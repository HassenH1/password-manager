import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import passwordServices from "../../../store/passwords";
import { IDataContext, useData } from "../../../context/data-context";
import useToggle from "../../../hook/Toggle";
import { useUser } from "../../../context/user-context";

type SelectedOption = 15 | 20 | 25;

function AddModal() {
  const user = useUser();
  const { setData } = useData() as IDataContext;
  const [selectedOption, setSelectedOption] = useState<SelectedOption>(15);
  const formik = useFormik({
    initialValues: {
      website: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      website: Yup.string()
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Enter correct url!"
        )
        .required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (value) => {
      saveCredentials(value);
    },
  });
  const [loadingGeneratedPW, toggleLoadingGeneratedPW] = useToggle();

  const settingPassword = async () => {
    try {
      toggleLoadingGeneratedPW();
      const generatedPassword = await passwordServices.generatePassword(
        Number(selectedOption) as SelectedOption
      );
      const { data, success } = generatedPassword;
      toggleLoadingGeneratedPW();
      if (!success) throw new Error("Something went wrong");
      formik.setFieldValue("password", data);
    } catch (error) {
      throw new Error(`problem generating password ${error}`);
    }
  };

  const saveCredentials = async (values: any) => {
    try {
      if (user && user?.currentUser) {
        values.userId = user?.currentUser?._id;
        const { success, message } = await passwordServices.createCredential(
          values
        );

        if (!success) throw new Error(message);

        setData((prev: any) => [
          ...prev,
          {
            website: formik.values.website,
            username: formik.values.username,
            password: formik.values.password,
          },
        ]);
        formik.resetForm();
      }
    } catch (error: any) {
      //set error state here
      console.log(error.message, ",===================ERROR CREATING CREDENTS");
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModalCenterTitle"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Add Password
            </h5>
          </div>
          <div className="modal-body">
            <label>Website:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                placeholder="www.passwordmanager.com"
                id="basic-url"
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
                type="text"
                placeholder={loadingGeneratedPW ? "Loading..." : "password"}
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
                onChange={(e) =>
                  setSelectedOption(
                    parseInt(e.target.value, 10) as SelectedOption
                  )
                }
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
              type="submit"
              className="btn btn-success"
              onClick={() => formik.handleSubmit()}
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

export default AddModal;
