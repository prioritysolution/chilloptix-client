"use client";

import { DatePickerField } from "@/common/formFields/DatePickerField";
import InputField from "@/common/formFields/InputField";
import TextareaField from "@/common/formFields/TextareaField";
import { Form } from "@/components/ui/form";
import { RentReceiptFormProps } from "@/container/processing/rentReceipt/RentReceiptTypes";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { IoSearch } from "react-icons/io5";

const RentReceiptForm: FC<RentReceiptFormProps> = ({
  form,
  setIsBondModalOpen,
  handleGetRentDetailsByBondNo,
  getBondDetailsLoading,
}) => {
  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-10 justify-between"
        autoComplete="off"
      >
        <div className="w-full border border-primary rounded-lg p-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 items-end ">
          <DatePickerField
            control={form.control}
            label="Posting Date"
            name="date"
            startYear={2000}
            endYear={2050}
            // disabled={rentReceiptTableData.length > 0}
          />

          <InputField
            control={form.control}
            label="Bond No."
            name="bondNo"
            className=""
            endContent={
              <IoSearch
                className="text-2xl cursor-pointer"
                onClick={() => setIsBondModalOpen(true)}
              />
            }
          />

          <div className="w-full flex items-end lg:col-span-2 xl:col-span-1 justify-end xl:justify-start">
            <Button
              onPress={handleGetRentDetailsByBondNo}
              color="primary"
              size="lg"
              radius="sm"
              className="w-32 self-end"
              isLoading={getBondDetailsLoading}
              isDisabled={getBondDetailsLoading}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
          <h3 className="w-full text-center text-xl font-semibold">
            Basic Info Block
          </h3>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
            <InputField
              control={form.control}
              label="Name"
              name="name"
              disabled
            />

            <InputField
              control={form.control}
              label="Guardian Name"
              name="guardianName"
              disabled
            />

            <InputField
              control={form.control}
              label="Mobile"
              name="phone"
              disabled
            />

            <TextareaField
              control={form.control}
              label="Address"
              name="address"
              disabled
            />

            <InputField
              control={form.control}
              label="Advance Amount"
              name="advanceAmount"
              disabled
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
export default RentReceiptForm;
