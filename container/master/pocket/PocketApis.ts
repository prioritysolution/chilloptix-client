import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { PocketBody } from "./PocketTypes";

export const addPocketAPI = async (
  bodyData: PocketBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addPocket,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getPocketAPI = async (orgId: number): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getPocket(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const getPocketUnderRackAPI = async (
  orgId: number,
  rackId: string
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getPocketUnderRack(orgId, rackId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const updatePocketAPI = async (
  bodyData: PocketBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.updatePocket,
    bodyData,
  };

  // Call the API
  const res = await doPutApiCall(data);

  return res;
};
