import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { BankAccountBody } from "./BankAccountTypes";

export const addBankAccountAPI = async (
  bodyData: BankAccountBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addBankAccount,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getBankAccountAPI = async (
  orgId: number
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getBankAccount(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

// export const updateBankAccountAPI = async (
//   bodyData: BankAccountBody
// ): Promise<ApiResponse> => {
//   let data = {
//     url: endPoints.updateBankAccount,
//     bodyData,
//   };

//   // Call the API
//   const res = await doPutApiCall(data);

//   return res;
// };

export const getBankLedgerAPI = async (): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getBankLedger,
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};
