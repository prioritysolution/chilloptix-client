import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { BookingRegisterBody } from "./BookingRegisterTypes";

export const addBookingRegisterAPI = async (
  bodyData: BookingRegisterBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addBookingRegister,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};
