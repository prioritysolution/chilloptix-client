"use client";

import CheckboxField from "@/common/formFields/CheckboxField";
import { DatePickerField } from "@/common/formFields/DatePickerField";
import InputField from "@/common/formFields/InputField";
import TextareaField from "@/common/formFields/TextareaField";
import { Form } from "@/components/ui/form";
import { BondEntryFormProps } from "@/container/processing/bondEntry/BondEntryTypes";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { IoSearch } from "react-icons/io5";

const BondEntryForm: FC<BondEntryFormProps> = ({
  form,
  handleSubmit,
  setIsBookingModalOpen,
  handleGetBookingDataByBookingNo,
  getBookingDetailsLoading,
  bondTableData,
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-10 justify-between"
        autoComplete="off"
      >
        <div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-center  gap-5 border border-primary rounded-lg p-5 ">
          <InputField
            control={form.control}
            label="Booking No."
            name="bookingNo"
            className="w-full lg:w-[380px]"
            endContent={
              <IoSearch
                className="text-2xl cursor-pointer"
                onClick={() => setIsBookingModalOpen(true)}
              />
            }
          />

          <Button
            onPress={handleGetBookingDataByBookingNo}
            color="primary"
            size="lg"
            radius="sm"
            className="w-32 self-end"
            isLoading={getBookingDetailsLoading}
            isDisabled={getBookingDetailsLoading || bondTableData.length > 0}
          >
            Next
          </Button>
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

            <TextareaField
              control={form.control}
              label="Address"
              name="address"
              disabled
            />

            <InputField
              control={form.control}
              label="Booking Date"
              name="bookingDate"
              disabled
            />

            <InputField
              control={form.control}
              label="Booking Valid Date"
              name="bookingValid"
              disabled
            />

            <InputField
              control={form.control}
              label="Booking Quantity (KG)"
              name="bookingQuantity"
              disabled
            />

            <DatePickerField
              control={form.control}
              label="Date"
              name="date"
              startYear={2000}
              endYear={2050}
              disabled={bondTableData.length > 0}
            />

            <InputField
              control={form.control}
              label="No. of Packages"
              name="noOfPackages"
              type="number"
            />

            <InputField
              control={form.control}
              label="Net Weight (KG)"
              name="netWeight"
              type="number"
            />

            <CheckboxField
              control={form.control}
              label="Verified"
              name="verified"
              className=""
            />
            <div className="lg:col-span-2 xl:col-span-3 flex items-center justify-end pt-5">
              <Button
                type="submit"
                color="primary"
                size="lg"
                radius="sm"
                className="w-full lg:w-1/3 xl:w-1/5 self-end"
              >
                Add To Table
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default BondEntryForm;
