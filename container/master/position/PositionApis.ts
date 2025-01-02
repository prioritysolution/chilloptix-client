import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { PositionBody } from "./PositionTypes";

export const addPositionAPI = async (
  bodyData: PositionBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addPosition,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getPositionAPI = async (orgId: number): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getPosition(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const updatePositionAPI = async (
  bodyData: PositionBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.updatePosition,
    bodyData,
  };

  // Call the API
  const res = await doPutApiCall(data);

  return res;
};
