enum Method {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface IRequestOptions {
  method: Method;
  headers: {
    "Content-Type": string;
  };
  credentials: string;
  body?: object | null | undefined;
}

interface IResponse {
  data: any;
  message: string;
  success: boolean;
}

export { Method, type IResponse, type IRequestOptions };
