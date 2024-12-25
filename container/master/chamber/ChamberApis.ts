import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { ChamberBody } from "./ChamberTypes";

export const addChamberAPI = async (
  bodyData: ChamberBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addChamber,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getChamberAPI = async (orgId: number): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getChamber(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const getChamberUnderFloorAPI = async (
  orgId: number,
  floorId: string
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getChamberUnderFloor(orgId, floorId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const updateChamberAPI = async (
  bodyData: ChamberBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.updateChamber,
    bodyData,
  };

  // Call the API
  const res = await doPutApiCall(data);

  return res;
};
