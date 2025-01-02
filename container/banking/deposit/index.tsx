"use client";

import Deposit from "@/components/banking/deposit";
import { useDeposit } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";
import { useBankAccount } from "@/container/master/bankAccount/Hooks";

const DepositContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    loading,
    form,
    handleSubmit,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
  } = useDeposit();

  const { getBankAccountApiCall } = useBankAccount();

  useEffect(() => {
    if (token && orgId) {
      getBankAccountApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Deposit
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      showSuccessMessage={showSuccessMessage}
      setShowSuccessMessage={setShowSuccessMessage}
      successMessage={successMessage}
    />
  );
};

export default DepositContainer;
