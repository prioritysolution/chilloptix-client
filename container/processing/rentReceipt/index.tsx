"use client";

import RentReceipt from "@/components/processing/rentReceipt";
import { useRentReceipt } from "./Hooks";
import getCookieData from "@/utils/getCookieData";
import { useBankAccount } from "@/container/master/bankAccount/Hooks";
import { useEffect } from "react";

const RentReceiptContainer = () => {
  const token = getCookieData<string | null>("chilloptixClientToken");
  const orgId = getCookieData<number | null>("chilloptixClientOrgId");

  const {
    loading,
    getBondDetailsLoading,
    form,
    rentDetailsForm,
    handleSubmit,
    handleRentDetailsSubmit,
    handleSelectBond,
    isOpenPdf,
    setIsOpenPdf,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    handleGetRentDetailsByBondNo,
    rentReceiptTableData,
    handleOpenRentDetails,
    openRentDetails,
    setOpenRentDetails,
    collectionDetailsTableData,
    handleDeleteCollection,
    handleShowPdf,
    rentCollectionPdfData,
  } = useRentReceipt();

  const { getBankAccountApiCall } = useBankAccount();

  useEffect(() => {
    if (token && orgId) {
      getBankAccountApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <RentReceipt
      loading={loading}
      getBondDetailsLoading={getBondDetailsLoading}
      form={form}
      rentDetailsForm={rentDetailsForm}
      handleSubmit={handleSubmit}
      handleRentDetailsSubmit={handleRentDetailsSubmit}
      handleSelectBond={handleSelectBond}
      isOpenPdf={isOpenPdf}
      setIsOpenPdf={setIsOpenPdf}
      showSuccessMessage={showSuccessMessage}
      setShowSuccessMessage={setShowSuccessMessage}
      successMessage={successMessage}
      handleGetRentDetailsByBondNo={handleGetRentDetailsByBondNo}
      rentReceiptTableData={rentReceiptTableData}
      handleOpenRentDetails={handleOpenRentDetails}
      openRentDetails={openRentDetails}
      setOpenRentDetails={setOpenRentDetails}
      collectionDetailsTableData={collectionDetailsTableData}
      handleDeleteCollection={handleDeleteCollection}
      handleShowPdf={handleShowPdf}
      rentCollectionPdfData={rentCollectionPdfData}
    />
  );
};
export default RentReceiptContainer;
