class AuthenticationService {
  /**
   * @TODO - put url in env file
   */
  private url = "http://localhost:4000/auth";
  signup = async (params: { [key: string]: string }) => {
    try {
      const resp = await fetch(`${this.url}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      return await resp.json();
    } catch (error) {
      throw new Error(`Sign up error in Authentication Service ${error}`);
    }
  };
  login = async (params: { [key: string]: string }) => {
    try {
      const resp = await fetch(`${this.url}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", //this is important
        body: JSON.stringify(params),
      });
      return await resp.json();
    } catch (error) {
      throw new Error(`Login error in Authentication Service ${error}`);
    }
  };
  forgotPassword = async (params: { [key: string]: string }) => {
    try {
      const resp = await fetch(`${this.url}/forgot-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      return await resp.json();
    } catch (error) {
      throw new Error(
        `Forgot password error in Authentication Service ${error}`
      );
    }
  };
  checkToken = async () => {
    try {
      const resp = await fetch(`${this.url}/check-token`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", //this is important
      });
      const data = await resp.json();
      return data;
    } catch (error) {
      throw new Error(
        `Forgot password error in Authentication Service ${error}`
      );
    }
  };
}

const authenticationService = new AuthenticationService();

export default authenticationService;
