import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import {
  CalculateRentBody,
  RentDetailsBody,
  RentReceiptBody,
} from "./RentReceiptTypes";

export const addCollectRentAPI = async (
  bodyData: RentReceiptBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addCollectRent,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getRentDetailsByBondNoAPI = async (
  bodyData: RentDetailsBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getRentDetailsByBondNo,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getCalculateRentAPI = async (
  bodyData: CalculateRentBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getCalculateRent,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};
