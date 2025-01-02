import { ApiResponse } from "@/container/ApiTypes";
import { doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { BankBalanceBody, DepositBody } from "./DepositTypes";

export const addDepositAPI = async (
  bodyData: DepositBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addBankDeposit,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getBankBalanceAPI = async (
  bodyData: BankBalanceBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getBankBalance,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};
