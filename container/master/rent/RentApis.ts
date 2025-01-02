import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { RentBody } from "./RentTypes";

export const addRentAPI = async (bodyData: RentBody): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addRent,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getLastRentDateAPI = async (
  orgId: number
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getLastRentDate(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
