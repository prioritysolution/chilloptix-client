import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { BondEntryBody } from "./BondEntryTypes";

export const addBondEntryAPI = async (
  bodyData: BondEntryBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addBondEntry,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getBookingDataByBookingNoAPI = async (
  orgId: number,
  bookNo: string
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getBookingDataByBookingNo(orgId, bookNo),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
