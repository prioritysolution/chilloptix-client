"use client";

import { DatePickerField } from "@/common/formFields/DatePickerField";
import InputField from "@/common/formFields/InputField";
import TextDropdownField from "@/common/formFields/TextDropdownField";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GeneralBookingProps } from "@/container/processing/generalBooking/GeneralBookingTypes";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import GeneralBookingPdf from "./GeneralBookingPdf";
import RadioField from "@/common/formFields/RadioFields";
import DropdownField from "@/common/formFields/DropdownField";
import { BankAccountTableData } from "@/container/master/bankAccount/BankAccountTypes";
import { useSelector } from "react-redux";
import SuccessMessage from "@/common/successMessage";

interface BankAccountState {
  bankAccountData: BankAccountTableData[];
}

interface RootState {
  bankAccount: BankAccountState;
}

const GeneralBooking: FC<GeneralBookingProps> = ({
  loading,
  form,
  handleSubmit,
  handleSelectCustomer,
  isOpen,
  setIsOpen,
  disableField,
  customerData,
  showTransBlock,
  bookingData,
  showSuccessMessage,
  setShowSuccessMessage,
  successMessage,
  handleShowPdf,
}) => {
  const bankAccountData: BankAccountTableData[] = useSelector(
    (state: RootState) => state?.bankAccount?.bankAccountData
  );

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg">
      <div className="flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">General Booking</h3>
        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 py-5 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-5 "
              autoComplete="off"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center w-full gap-5 gap-y-3 border-2 p-5 border-primary rounded-md">
                <DatePickerField
                  control={form.control}
                  name="bookingDate"
                  label="Booking Date"
                />

                <TextDropdownField
                  control={form.control}
                  label="Applicant Name"
                  name="name"
                  placeholder="Enter name"
                  dataset={customerData}
                  handleSelect={handleSelectCustomer}
                />

                <InputField
                  control={form.control}
                  name="guardianName"
                  label="Guardian Name"
                  disabled={disableField}
                />

                <InputField
                  control={form.control}
                  name="village"
                  label="Village"
                  disabled={disableField}
                />

                <InputField
                  control={form.control}
                  name="postOffice"
                  label="Post Office"
                  disabled={disableField}
                />

                <InputField
                  control={form.control}
                  name="pinCode"
                  label="PIN Code"
                  type="number"
                  disabled={disableField}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement; // Ensure type safety
                    if (input.value.length > 6) {
                      input.value = input.value.slice(0, 6);
                    }
                  }}
                />

                <InputField
                  control={form.control}
                  name="district"
                  label="District"
                  disabled={disableField}
                />

                <InputField
                  control={form.control}
                  name="mobile"
                  label="Mobile"
                  type="number"
                  disabled={disableField}
                />

                <InputField
                  control={form.control}
                  name="quantity"
                  label="Quantity (KG)"
                  type="number"
                />

                <InputField
                  control={form.control}
                  name="advanceAmount"
                  label="Advance Amount"
                  type="number"
                />

                <DatePickerField
                  control={form.control}
                  name="validUpto"
                  label="Valid Upto"
                />
              </div>

              {showTransBlock && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center w-full gap-5 gap-y-3 border-2 p-5 border-primary rounded-md">
                  <RadioField
                    control={form.control}
                    name="transType"
                    label="Transanction Type"
                    options={[
                      { value: "bank", label: "Bank" },
                      { value: "cash", label: "Cash" },
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
                </div>
              )}

              <Button
                type="submit"
                color="primary"
                size="lg"
                radius="sm"
                className="w-full sm:w-1/5 self-end"
                isLoading={loading}
                isDisabled={loading}
              >
                Add
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </div>

      <GeneralBookingPdf
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        bookingData={bookingData}
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
export default GeneralBooking;
