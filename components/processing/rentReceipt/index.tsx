"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FC, useState } from "react";
import SuccessMessage from "@/common/successMessage";
import BondSearch from "@/common/form/bondSearchForm";
import { RentReceiptProps } from "@/container/processing/rentReceipt/RentReceiptTypes";
import RentReceiptForm from "./RentReceiptForm";
import RentReceiptTable from "./RentReceiptTable";
import RentDetailsForm from "./RentDetailsModal";
import CollectionDetailsTable from "./CollectionDetailsTable";
import { Button } from "@nextui-org/react";
import { Form } from "@/components/ui/form";
import RadioField from "@/common/formFields/RadioFields";
import DropdownField from "@/common/formFields/DropdownField";
import InputField from "@/common/formFields/InputField";
import { BankAccountTableData } from "@/container/master/bankAccount/BankAccountTypes";
import { useSelector } from "react-redux";
import RentReceiptPdf from "./RentReceiptPdf";

interface BankAccountState {
  bankAccountData: BankAccountTableData[];
}

interface RootState {
  bankAccount: BankAccountState;
}

const RentReceipt: FC<RentReceiptProps> = ({
  loading,
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
  getBondDetailsLoading,
  rentReceiptTableData,
  handleOpenRentDetails,
  openRentDetails,
  setOpenRentDetails,
  collectionDetailsTableData,
  handleDeleteCollection,
  handleShowPdf,
  rentCollectionPdfData,
}) => {
  const [isBondModalOpen, setIsBondModalOpen] = useState(false);

  const bankAccountData: BankAccountTableData[] = useSelector(
    (state: RootState) => state?.bankAccount?.bankAccountData
  );

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg">
      <div className="flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Rent Receipt</h3>
        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20 ">
          <RentReceiptForm
            getBondDetailsLoading={getBondDetailsLoading}
            form={form}
            handleGetRentDetailsByBondNo={handleGetRentDetailsByBondNo}
            setIsBondModalOpen={setIsBondModalOpen}
          />

          <div className="w-[300px] sm:w-[400px] md:w-[350px] lg:w-[500px] xl:w-full mx-auto my-10 border border-primary rounded-2xl overflow-hidden">
            <ScrollArea>
              <RentReceiptTable
                rentReceiptTableData={rentReceiptTableData}
                handleOpenRentDetails={handleOpenRentDetails}
                collectionDetailsTableData={collectionDetailsTableData}
              />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="w-[300px] sm:w-[400px] md:w-[350px] lg:w-[500px] xl:w-full mx-auto my-10 border border-primary rounded-2xl overflow-hidden">
            <ScrollArea>
              <CollectionDetailsTable
                collectionDetailsTableData={collectionDetailsTableData}
                handleDeleteCollection={handleDeleteCollection}
              />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <Form {...form}>
            <form autoComplete="off">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center w-full my-10 gap-5 gap-y-3 border p-5 border-primary rounded-lg">
                <RadioField
                  control={form.control}
                  name="transType"
                  label="Transanction Type"
                  options={[
                    { value: "cash", label: "Cash" },
                    { value: "bank", label: "Bank" },
                  ]}
                  orientation="horizontal"
                  className="w-full"
                />

                {form.getValues("transType") === "bank" && (
                  <DropdownField
                    control={form.control}
                    name="bankId"
                    options={bankAccountData}
                    label="Bank"
                    optionLabelKey="Bank_Name"
                  />
                )}

                <InputField
                  control={form.control}
                  name="refVouch"
                  label="Referance Voucher"
                />

                <InputField
                  control={form.control}
                  name="collectAmount"
                  label="Amount to be Collected"
                  disabled
                />
              </div>
            </form>
          </Form>

          <div className="w-full flex justify-end">
            <Button
              color="primary"
              size="lg"
              radius="sm"
              className="w-full lg:w-1/5"
              isLoading={loading}
              isDisabled={loading || !(collectionDetailsTableData.length > 0)}
              onPress={() => {
                form.handleSubmit(handleSubmit)();
              }}
            >
              Add
            </Button>
          </div>
        </ScrollArea>

        <BondSearch
          isBondModalOpen={isBondModalOpen}
          setIsBondModalOpen={setIsBondModalOpen}
          handleSelectData={handleSelectBond}
        />
      </div>

      <RentDetailsForm
        form={rentDetailsForm}
        handleSubmit={handleRentDetailsSubmit}
        isOpen={openRentDetails}
        setIsOpen={setOpenRentDetails}
      />

      <SuccessMessage
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        handleNextClick={handleShowPdf}
        nextLabel="Generate"
      />

      {rentCollectionPdfData && (
        <RentReceiptPdf
          isOpen={isOpenPdf}
          setIsOpen={setIsOpenPdf}
          rentCollectionPdfData={rentCollectionPdfData}
        />
      )}
    </div>
  );
};
export default RentReceipt;
