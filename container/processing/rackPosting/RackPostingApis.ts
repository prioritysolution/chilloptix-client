import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { RackPostingBody } from "./RackPostingTypes";

export const addRackPostingAPI = async (
  bodyData: RackPostingBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addRackPosting,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getBondDataByBondNoAPI = async (
  orgId: number,
  bondNo: string
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getBondDataByBondNo(orgId, bondNo),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
