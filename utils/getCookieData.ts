import Cookies from "js-cookie";

type CookieKey =
  | "chilloptixClientToken"
  | "chilloptixClientOrgId"
  | "chilloptixClientOrgName"
  | "chilloptixClientOrgAddress"
  | "chilloptixClientOrgMobile"
  | "chilloptixClientOrgReg"
  | "chilloptixClientOrgRegDate"
  | "chilloptixClientFinStartDate"
  | "chilloptixClientFinEndDate"
  | "chilloptixClientFinId";

const getCookieData = <T = unknown>(key: CookieKey): T | null => {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) return null;

  try {
    // Attempt to parse as JSON and return
    return JSON.parse(cookieValue) as T;
  } catch {
    // If parsing fails, return raw value
    return cookieValue as T;
  }
};

export default getCookieData;
