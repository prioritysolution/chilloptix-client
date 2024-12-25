import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import getCookieData from "./getCookieData";
import { ApiResponse } from "@/container/ApiTypes";

// Define types for API call params
interface ApiRequestData {
  url: string;
  bodyData?: any;
}

const makeApiCall = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  data: ApiRequestData,
  content: "application/json" | "multipart/form-data" = "application/json"
): Promise<ApiResponse> => {
  try {
    let token = null;
    if (typeof window !== "undefined") {
      token = getCookieData<string>("chilloptixClientToken");
    }

    const headers: Record<string, string> = {
      "Content-Type": content,
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    let body;

    body =
      content === "multipart/form-data"
        ? data.bodyData
        : JSON.stringify(data.bodyData);

    let response: AxiosResponse;

    switch (method) {
      case "GET":
        response = await axios.get(data?.url, { headers });
        break;
      case "POST":
        response = await axios.post(data?.url, body, { headers });
        break;
      case "PUT":
        response = await axios.put(data?.url, body, { headers });
        break;
      case "DELETE":
        response = await axios.delete(data?.url, { headers });
        break;
      default:
        throw new Error("Invalid HTTP method");
    }

    if (response.status === 401) {
      // Handle unauthorized access
      Cookies.remove("chilloptixClientToken");
    }

    if (response?.data?.token) {
      Cookies.set("chilloptixClientToken", response.data.token);
    }

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // Handle API error
    throw error;
  }
};

// API Helper Functions
export const doGetApiCall = (data: ApiRequestData) => makeApiCall("GET", data);
export const doPostApiCall = (
  data: ApiRequestData,
  content: "application/json" | "multipart/form-data" = "application/json"
) => makeApiCall("POST", data, content);
export const doDeleteApiCall = (data: ApiRequestData) =>
  makeApiCall("DELETE", data);
export const doPutApiCall = (data: ApiRequestData) => makeApiCall("PUT", data);
