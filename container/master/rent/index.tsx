"use client";

import getCookieData from "@/utils/getCookieData";
import { useRent } from "./Hooks";
import Rent from "@/components/master/rent";
import { useEffect } from "react";

const RentContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    loading,
    form,
    handleSubmit,
    getLastRentDateApiCall,
    startDate,
    fromDateDisable,
  } = useRent();

  useEffect(() => {
    if (token && orgId) {
      getLastRentDateApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Rent
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      startDate={startDate}
      fromDateDisable={fromDateDisable}
    />
  );
};
export default RentContainer;
