import { Method } from "./types";

export const fetchMethod = async (
  url: string,
  method: Method,
  body?: BodyInit | null | undefined
) => {
  try {
    const requestOptions: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: null || JSON.stringify(body),
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const isObjectEmpty = (objectName: object): boolean =>
  Object.keys(objectName).length === 0;
