import React, { ChangeEvent, useState } from "react";
import AddModal from "../../components/modal/addModal/AddModal";
import { IDataContext, useData } from "../../context/data-context";
import RenderList from "../../module/dashboard/RenderList";
import Button from "../../components/base/button/Button";
import Input from "../../components/base/input/Input";

/**
 * Component for displaying dashboard.
 *
 * @component
 * @example
 * return (
 *   <Dashboard />
 * )
 * @returns     {JSX.Element}
 */
function Dashboard() {
  const { data } = useData() as IDataContext;
  const [searchInput, setSearchInput] = useState("");

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  return (
    <div style={{ height: "88vh" }}>
      <div className="container mt-3">
        <div className="m-0">
          <div className="input-group mb-3 d-flex justify-content-center align-items-center">
            <div className="w-50">
              <Input
                type="text"
                className="form-control input-text"
                placeHolder="Search...."
                ariaLabel="Recipient's username"
                ariaDescribedby="basic-addon2"
                disabled={data.length === 0 && true}
                onChange={inputHandler}
                value={searchInput}
              />
            </div>
            <div className="input-group-append">
              <Button
                name="Search"
                className="btn btn-outline-warning"
                type="button"
                disabled={data.length === 0 && true}
              />
            </div>
            <div className="mx-2" />
            <div className="input-group-append">
              <Button
                name="Add +"
                className="btn btn-outline-primary"
                dataBsToggle="modal"
                dataBsTarget="#exampleModalCenterTitle"
              />
            </div>
          </div>
        </div>
        <RenderList searchInput={searchInput} />
      </div>
      <AddModal />
    </div>
  );
}
export default Dashboard;
