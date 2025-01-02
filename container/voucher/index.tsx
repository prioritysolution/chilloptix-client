"use client";

import Voucher from "@/components/voucher";
import { useVoucher } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";

const VoucherContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");

  const {
    loading,
    form,
    handleSubmit,
    getVoucherLedgerDataApiCall,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
  } = useVoucher();

  useEffect(() => {
    if (token) {
      getVoucherLedgerDataApiCall();
    }
  }, [token]);

  return (
    <Voucher
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      showSuccessMessage={showSuccessMessage}
      setShowSuccessMessage={setShowSuccessMessage}
      successMessage={successMessage}
    />
  );
};
export default VoucherContainer;
