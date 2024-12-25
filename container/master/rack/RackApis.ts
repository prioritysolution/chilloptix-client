import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { RackBody } from "./RackTypes";

export const addRackAPI = async (bodyData: RackBody): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addRack,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getRackAPI = async (orgId: number): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getRack(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const getRackUnderChamberAPI = async (
  orgId: number,
  chamberId: string
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getRackUnderChamber(orgId, chamberId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const updateRackAPI = async (
  bodyData: RackBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.updateRack,
    bodyData,
  };

  // Call the API
  const res = await doPutApiCall(data);

  return res;
};
