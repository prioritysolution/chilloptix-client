import { ApiResponse } from "@/container/ApiTypes";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { LicenseRenewalBody } from "./LicenseRenewalTypes";

export const addLicenseRenewalAPI = async (
  bodyData: LicenseRenewalBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.addLicenseRenewal,
    bodyData,
  };

  // Call the API
  const res = await doPostApiCall(data);

  return res;
};

export const getLicenseRenewalAPI = async (
  orgId: number
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.getLicenseRenewal(orgId),
  };

  // Call the API
  const res = await doGetApiCall(data);

  return res;
};

export const updateLicenseRenewalAPI = async (
  bodyData: LicenseRenewalBody
): Promise<ApiResponse> => {
  let data = {
    url: endPoints.updateLicenseRenewal,
    bodyData,
  };

  // Call the API
  const res = await doPutApiCall(data);

  return res;
};
