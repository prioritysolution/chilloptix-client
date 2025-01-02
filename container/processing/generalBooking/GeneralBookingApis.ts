import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { GeneralBookingBody } from "./GeneralBookingTypes";

export const addGeneralBookingAPI = async (
  bodyData: GeneralBookingBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addGeneralBooking,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getBankCustomerAPI = async (
  orgId: number,
  keyword: string
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getBankCustomer(orgId, keyword),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
