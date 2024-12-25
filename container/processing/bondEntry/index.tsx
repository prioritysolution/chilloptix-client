"use client";

import BondEntry from "@/components/processing/bondEntry";
import { useBondEntry } from "./Hooks";

const BondEntryContainer = () => {
  const {
    loading,
    getBookingDetailsLoading,
    form,
    handleSubmit,
    handleSelectBooking,
    isOpen,
    setIsOpen,
    showSuccessMessage,
    setShowSuccessMessage,
    successMessage,
    handleShowPdf,
    bondPdfData,
    handleGetBookingDataByBookingNo,
    bondTableData,
    handleDeleteFromTable,
    handleAddBondEntry,
  } = useBondEntry();

  return (
    <BondEntry
      loading={loading}
      getBookingDetailsLoading={getBookingDetailsLoading}
      form={form}
      handleSubmit={handleSubmit}
      handleSelectBooking={handleSelectBooking}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      bondPdfData={bondPdfData}
      showSuccessMessage={showSuccessMessage}
      setShowSuccessMessage={setShowSuccessMessage}
      successMessage={successMessage}
      handleShowPdf={handleShowPdf}
      handleGetBookingDataByBookingNo={handleGetBookingDataByBookingNo}
      bondTableData={bondTableData}
      handleDeleteFromTable={handleDeleteFromTable}
      handleAddBondEntry={handleAddBondEntry}
    />
  );
};
export default BondEntryContainer;
