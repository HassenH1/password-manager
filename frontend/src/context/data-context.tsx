import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "./user-context";
import passwordServices from "../store/passwords";
import useToggle from "../hook/Toggle";

export interface Props {
  children: ReactNode;
}

export interface IDataContext {
  data: any[];
  setData: Function;
  dataLoader: boolean;
}

export interface ICard {
  website: string;
  password: string;
  username: string;
}

type TCards = Array<ICard>;

const DataContext = createContext<null | IDataContext>(null);

/**
 * Context provider for user data.
 *
 * @component
 * @property    {ReactNode}     children
 * @example
 * return (
 *   <DataProvider>
 *    <SomeComponent />
 *   <DataProvider />
 * )
 * @returns     {JSX.Element}
 */
function DataProvider(props: Props) {
  const { children } = props;
  const { currentUser }: any = useUser();
  const [data, setData] = useState<TCards>([]);
  const [dataLoader, setDataLoader] = useToggle();

  useEffect(() => {
    const getAllCredentials = async () => {
      setDataLoader();
      try {
        if (currentUser && currentUser._id) {
          const resp = await passwordServices.getAllPasswords(currentUser._id);
          setData(resp.data);
        }
        setDataLoader();
      } catch (error: any) {
        setDataLoader();
        throw new Error(error);
      }
    };

    if (currentUser) getAllCredentials();
  }, [currentUser?._id]);

  return (
    <DataContext.Provider value={{ data, setData, dataLoader }}>
      {children}
    </DataContext.Provider>
  );
}

/**
 * Context hook for user data.
 *
 * @component
 * @example
 * const { data, setData, dataLoader } = useData()
 * @returns     {IDataContext | null}
 */
function useData() {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error("useData must be used within a DataProvider");
  return context;
}

export { DataProvider, useData };
