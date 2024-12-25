"use client";

import BookingSearch from "@/common/form/bookingSearchForm";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BondEntryProps } from "@/container/processing/bondEntry/BondEntryTypes";
import { Button } from "@nextui-org/react";
import { FC, useState } from "react";
import BondEntryTable from "./BondEntryTable";
import BondEntryForm from "./BondEntryForm";
import BondEntryPdf from "./BondEntryPdf";
import SuccessMessage from "@/common/successMessage";

const BondEntry: FC<BondEntryProps> = ({
  loading,
  form,
  handleSubmit,
  handleSelectBooking,
  isOpen,
  setIsOpen,
  bondPdfData,
  showSuccessMessage,
  setShowSuccessMessage,
  successMessage,
  handleShowPdf,
  handleGetBookingDataByBookingNo,
  getBookingDetailsLoading,
  bondTableData,
  handleDeleteFromTable,
  handleAddBondEntry,
}) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg">
      <div className="flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Bond Entry</h3>
        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20 ">
          <BondEntryForm
            getBookingDetailsLoading={getBookingDetailsLoading}
            form={form}
            handleSubmit={handleSubmit}
            handleGetBookingDataByBookingNo={handleGetBookingDataByBookingNo}
            bondTableData={bondTableData}
            handleAddBondEntry={handleAddBondEntry}
            setIsBookingModalOpen={setIsBookingModalOpen}
          />

          <div className="w-[300px] sm:w-[400px] md:w-[350px] lg:w-[500px] xl:w-full mx-auto my-10 border border-primary rounded-2xl overflow-hidden">
            <ScrollArea>
              <BondEntryTable
                bondTableData={bondTableData}
                handleDeleteFromTable={handleDeleteFromTable}
              />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="w-full flex justify-end">
            <Button
              color="primary"
              size="lg"
              radius="sm"
              className="w-full lg:w-1/5"
              isLoading={loading}
              isDisabled={loading || !(bondTableData.length > 0)}
              onPress={handleAddBondEntry}
            >
              Add
            </Button>
          </div>
        </ScrollArea>
        <BookingSearch
          isBookingModalOpen={isBookingModalOpen}
          setIsBookingModalOpen={setIsBookingModalOpen}
          handleSelectData={handleSelectBooking}
        />
      </div>

      <BondEntryPdf
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        bondPdfData={bondPdfData}
      />

      <SuccessMessage
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        handleNextClick={handleShowPdf}
        nextLabel="Generate"
      />
    </div>
  );
};
export default BondEntry;
