import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { FloorBody } from "./FloorTypes";

export const addFloorAPI = async (
  bodyData: FloorBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addFloor,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getFloorAPI = async (orgId: number): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getFloor(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const updateFloorAPI = async (
  bodyData: FloorBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.updateFloor,
    bodyData,
  };

  // Call the API
  const res = await doPutApiCall(data);

  return res;
};
