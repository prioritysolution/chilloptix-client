"use client";
import { FC } from "react";
import { BookingSearchFormProps } from "./BookingSearchTypes";
import { Form } from "@/components/ui/form";
import RadioField from "@/common/formFields/RadioFields";
import InputField from "@/common/formFields/InputField";
import { IoSearch } from "react-icons/io5";

const BookingSearchForm: FC<BookingSearchFormProps> = ({
  form,
  loading,
  handleSubmit,
}) => {
  const bookingSearchTypeOptions = [
    {
      value: "1",
      label: "Name",
    },
    {
      value: "2",
      label: "Number",
    },
    {
      value: "3",
      label: "Mobile No.",
    },
  ];

  return (
    <div className="w-full">
      <Form {...form}>
        <form autoComplete="off" className={`w-full`}>
          <div className="flex flex-col w-full gap-3">
            <div
              className="w-full grid gap-4 items-end"
              style={{ gridTemplateColumns: `repeat(2, minmax(0, 1fr))` }}
            >
              <RadioField
                control={form.control}
                name="bookingType"
                label="Booking Type"
                options={bookingSearchTypeOptions}
                orientation="horizontal"
                className="w-full"
              />

              <InputField
                control={form.control}
                name="searchKey"
                label="Search Key"
                endContent={
                  <IoSearch
                    className="text-2xl cursor-pointer"
                    onClick={form.handleSubmit(handleSubmit)}
                  />
                }
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingSearchForm;
