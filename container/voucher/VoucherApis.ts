import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { VoucherBody } from "./VoucherTypes";

export const addVoucherAPI = async (
  bodyData: VoucherBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addVoucher,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getVoucherLedgerDataAPI = async (): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getVoucherLedgerData,
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
