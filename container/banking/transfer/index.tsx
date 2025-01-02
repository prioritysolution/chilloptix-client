"use client";

import { useTransfer } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";
import { useBankAccount } from "@/container/master/bankAccount/Hooks";
import Transfer from "@/components/banking/transfer";
import { useVoucher } from "@/container/voucher/Hooks";

const TransferContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    loading,
    form,
    handleSubmit,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
  } = useTransfer();

  const { getBankAccountApiCall } = useBankAccount();

  const { getVoucherLedgerDataApiCall } = useVoucher();

  useEffect(() => {
    if (token && orgId) {
      getVoucherLedgerDataApiCall();
      getBankAccountApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Transfer
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      showSuccessMessage={showSuccessMessage}
      setShowSuccessMessage={setShowSuccessMessage}
      successMessage={successMessage}
    />
  );
};

export default TransferContainer;
