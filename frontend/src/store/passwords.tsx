import { IResponse, Method } from "./types";

// @todo - Change name of class and methods
class PasswordServices {
  private url: string = "http://localhost:4000/credentials";

  getAllPasswords = async (userId: string): Promise<IResponse> => {
    try {
      const resp = await fetch(`${this.url}/get-all-credentials/${userId}`, {
        method: Method.GET,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data: IResponse = await resp.json();
      return data;
    } catch (error) {
      throw new Error(`Get all passwords error in Password Service ${error}`);
    }
  };

  getSinglePasswords = async (
    id: string,
    userId: string
  ): Promise<IResponse> => {
    try {
      const resp = await fetch(
        `${this.url}/get-single-credentials/${id}/${userId}`,
        {
          method: Method.GET,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data: IResponse = await resp.json();
      return data;
    } catch (error) {
      throw new Error(
        `Get single passwords error in Password Service ${error}`
      );
    }
  };

  patchPasswords = async (
    id: string,
    userId: string,
    payload: object
  ): Promise<IResponse> => {
    try {
      const resp = await fetch(
        `${this.url}/patch-credentials/${id}/${userId}`,
        {
          method: Method.PATCH,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ payload }),
        }
      );
      const data: IResponse = await resp.json();
      return data;
    } catch (error) {
      throw new Error(`Patch passwords error in Password Service ${error}`);
    }
  };

  deletePasswords = async (id: string, userId: string): Promise<IResponse> => {
    try {
      const resp = await fetch(
        `${this.url}/remove-credentials/${id}/${userId}`,
        {
          method: Method.DELETE,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data: IResponse = await resp.json();
      return data;
    } catch (error) {
      throw new Error(`Remove passwords error in Password Service ${error}`);
    }
  };

  createCredential = async (payload: object): Promise<IResponse> => {
    try {
      const resp = await fetch(`${this.url}/create-credentials`, {
        method: Method.POST,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data: IResponse = await resp.json();
      return data;
    } catch (error) {
      throw new Error(`Get all passwords error in Password Service ${error}`);
    }
  };

  generatePassword = async (passwordLength: 15 | 20 | 25) => {
    try {
      const response = await fetch(
        `${this.url}/generate-password/${passwordLength}`,
        {
          method: Method.GET,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(`Error creating password ${error}`);
    }
  };
}

const passwordServices = new PasswordServices();

export default passwordServices;
