"use client";

import { useWithdrawn } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";
import { useBankAccount } from "@/container/master/bankAccount/Hooks";
import Withdrawn from "@/components/banking/withdrawn";

const WithdrawnContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    loading,
    form,
    handleSubmit,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
  } = useWithdrawn();

  const { getBankAccountApiCall } = useBankAccount();

  useEffect(() => {
    if (token && orgId) {
      getBankAccountApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Withdrawn
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      showSuccessMessage={showSuccessMessage}
      setShowSuccessMessage={setShowSuccessMessage}
      successMessage={successMessage}
    />
  );
};

export default WithdrawnContainer;
