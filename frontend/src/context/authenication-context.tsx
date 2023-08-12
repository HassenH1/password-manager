import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import localForage from "localforage";
import useToggle from "../hook/Toggle";

export interface Props {
  children: ReactNode;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  logIn: () => Promise<void>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  logOut: any;
}

const AuthenticationContext = createContext<null | IAuthContext>(null);

/**
 * Context provider for authentication.
 *
 * @component
 * @property    {ReactNode}     children
 * @example
 * return (
 *   <AuthenicationProvider>
 *    <SomeComponent />
 *   <AuthenicationProvider />
 * )
 * @returns     {JSX.Element}
 */
function AuthenicationProvider(props: Props) {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("auth") === "true" ? true : false
  );
  const [authLoader, setAuthLoader] = useToggle();

  const logIn = () => checkAuth();

  const checkAuth = async () => {
    try {
      // setAuthLoader();
      const auth: any = await localForage.getItem("authentication");

      setIsAuthenticated(!!auth?.access_token);

      if (auth?.access_token) {
        localStorage.setItem("auth", "true");
      } else {
        await logOut();
      }
      // setAuthLoader();
    } catch (error: any) {
      // throw new Error(error);
    }
  };

  const logOut = async () => {
    try {
      await localForage.clear();
      setIsAuthenticated(false);
      localStorage.clear();
    } catch (error) {
      throw new Error("Having trouble logging out");
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localForage.getItem("authentication")]);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, checkAuth, logIn, setIsAuthenticated, logOut }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

/**
 * Context hook for authentication.
 *
 * @component
 * @example
 * const { isAuthenticated, checkAuth, logIn, setIsAuthenticated, logOut } = useAuthentication()
 * @returns     {IAuthContext | null}
 */
function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AuthenicationProvider"
    );
  }
  return context;
}

export { AuthenicationProvider, useAuthentication };
