import React, { useState } from "react";
import EditModal from "../../components/modal/editModal/EditModal";
import { IDataContext, useData } from "../../context/data-context";
import passwordServices from "../../store/passwords";
import { useUser } from "../../context/user-context";
import Loading from "../../components/loading/Loading";

export interface Card {
  website: string;
  password: string;
  username: string;
}

/**
 * Component for displaying a list of user credentials.
 *
 * @component
 * @property    {string}     searchInput     value to search list
 * @example
 * const searchInput = google
 * return (
 *   <RenderList searchInput={searchInput} />
 * )
 * @returns     {JSX.Element}
 */
const RenderList = ({ searchInput }: { searchInput: string }) => {
  const { data, setData, dataLoader } = useData() as IDataContext;
  const user = useUser();
  const [pwmData, setPwmData] = useState();

  const maskCharacterIfTooLong = (
    str: string,
    len: number = 6,
    mask: string = "..."
  ) => {
    if (str.length > len) {
      const newStr = str.slice(0, 6);
      return newStr + mask;
    }
    return str;
  };

  const shortenWebsiteUrl = (siteName: string) => {
    const siteNameSplit = siteName?.split(".");

    let newSiteName = "";
    for (let i = 1; i < siteNameSplit.length; i++) {
      if (i === siteNameSplit.length - 1) break;
      newSiteName += siteNameSplit[i];
      if (siteNameSplit.length > 3) newSiteName += ".";
    }
    newSiteName = newSiteName.slice(0, 1).toUpperCase() + newSiteName.slice(1);
    return newSiteName[newSiteName.length - 1] === "."
      ? newSiteName.slice(0, newSiteName.length - 1)
      : newSiteName;
  };

  const removeCredential = async (credId: string) => {
    try {
      if (user && user.currentUser) {
        const { success } = await passwordServices.deletePasswords(
          credId,
          user?.currentUser?._id
        );
        if (!success) throw new Error("Cannot remove credential");

        setData((prev: any) => prev.filter((cred: any) => cred._id !== credId));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  console.log(dataLoader, "<===========================dataloader");
  console.log(user?.userLoading, "<===========================userloading");

  if (dataLoader || user?.userLoading) {
    console.log("DATA LOADER <========================");
    return <Loading />;
  }

  if (data.length === 0) {
    console.log("NO DATA <========================");
    return (
      <div className="d-flex justify-content-center align-items-center text-center">
        <h3>You have not generated any passwords yet...</h3>
      </div>
    );
  }

  const filteredData = data.filter((el) => {
    if (searchInput === "") {
      return el;
    } else {
      return el.website.toLowerCase().includes(searchInput);
    }
  });

  return (
    <div className="row m-0">
      <div className="container text-center">
        <div className="row justify-content-center align-items-center">
          <div className="col">
            <h4 className="lead">Name</h4>
          </div>
          <div className="col">
            <h4 className="lead">Last updated</h4>
          </div>
          <div className="col d-flex justify-content-start"></div>
        </div>
        <hr />
        {filteredData.map((card: Card, idx: number) => {
          return (
            <div key={idx}>
              <div className="row align-items-center">
                <div className="col">
                  <div>
                    <span>
                      <strong>
                        {card.website && shortenWebsiteUrl(card.website)}
                      </strong>
                    </span>
                    <br />
                    <small className="text-body-secondary">
                      {maskCharacterIfTooLong(card.username)}
                    </small>
                  </div>
                </div>
                <div className="col">
                  {new Date().toISOString().split("T")[0]}
                </div>
                <div className="col">
                  <div className="dropdown">
                    <button
                      className="btn border"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>

                    <ul className="dropdown-menu">
                      <li>
                        <div className="dropdown-item">Show password</div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => setPwmData(data[idx])}
                        >
                          Edit
                        </div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => removeCredential(data[idx]._id)}
                        >
                          Delete
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <EditModal data={pwmData} />
    </div>
  );
};

export default RenderList;
