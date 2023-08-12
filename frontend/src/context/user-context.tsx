import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthentication } from "./authenication-context";
import localForage from "localforage";
import useToggle from "../hook/Toggle";

export interface Props {
  children: ReactNode;
}

export interface IUserContext {
  currentUser?: ICurrentUser;
  userLoading: boolean;
}

interface ICurrentUser {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const UserContext = createContext<null | IUserContext>(null);

function UserProvider(props: Props) {
  const { children } = props;
  const { isAuthenticated, logOut }: any = useAuthentication();
  const [currentUser, setCurrentUser] = useState();
  const [userLoading, setUserLoading] = useToggle();

  useEffect(() => {
    const setUser = async () => {
      setUserLoading();
      try {
        const auth: any = await localForage.getItem("authentication");
        if (auth && auth.data) {
          setCurrentUser(auth.data);
        } else {
          await logOut();
        }
        setUserLoading();
      } catch (error: any) {
        setUserLoading();
        throw new Error(error);
      }
    };

    setUser();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ currentUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
