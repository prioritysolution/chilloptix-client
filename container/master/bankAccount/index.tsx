"use client";

import getCookieData from "@/utils/getCookieData";
import { useEffect } from "react";
import { useBankAccount } from "./Hooks";
import BankAccount from "@/components/master/bankAccount";

const BankAccountContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    getBankAccountApiCall,
    getBankLedgerApiCall,
    addBankAccountLoading,
    // updateBankAccountLoading,
    loading,
    form,
    handleSubmit,
    isOpen,
    setIsOpen,
    // editData,
    // handleEditData,
    disableOpeningBalance,
  } = useBankAccount();

  useEffect(() => {
    if (token && orgId) {
      getBankAccountApiCall(orgId);
      getBankLedgerApiCall();
    }
  }, [token, orgId]);

  return (
    <BankAccount
      addBankAccountLoading={addBankAccountLoading}
      // updateBankAccountLoading={updateBankAccountLoading}
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      // editData={editData}
      // handleEditData={handleEditData}
      disableOpeningBalance={disableOpeningBalance}
    />
  );
};
export default BankAccountContainer;
