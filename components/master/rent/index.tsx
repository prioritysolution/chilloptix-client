"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, Divider } from "@nextui-org/react";
import { FC } from "react";
import { RentProps } from "@/container/master/rent/RentTypes";
import { Form } from "@/components/ui/form";
import InputField from "@/common/formFields/InputField";
import { DatePickerField } from "@/common/formFields/DatePickerField";

const Rent: FC<RentProps> = ({
  loading,
  form,
  handleSubmit,
  startDate,
  fromDateDisable,
}) => {
  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Rent Master</h3>

        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 ">
          <div className="w-full flex justify-center">
            <Form {...form}>
              <form
                className="w-full lg:w-[600px] border-2 border-primary rounded-md py-5 flex flex-col gap-5 items-center"
                autoComplete="off"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <h3 className="justify-center text-2xl font-medium">
                  Add New Rent
                </h3>
                <Divider />
                <div className="w-full flex flex-col gap-3 px-5 ">
                  <InputField
                    control={form.control}
                    name="basicRate"
                    label="Basic Rate"
                    type="number"
                  />

                  <InputField
                    control={form.control}
                    name="insurance"
                    label="Insurance"
                    type="number"
                  />

                  <InputField
                    control={form.control}
                    name="regulatedMarketFee"
                    label="Regulated Market Fee (RMS)"
                    type="number"
                  />

                  <InputField
                    control={form.control}
                    name="amount"
                    label="Drying Amount"
                    type="number"
                  />

                  <DatePickerField
                    control={form.control}
                    label="From Date"
                    name="effectFrom"
                    startYear={2000}
                    endYear={2050}
                    disabled={fromDateDisable}
                    disabledDateBefore={
                      startDate ? new Date(startDate) : undefined
                    }
                  />

                  <DatePickerField
                    control={form.control}
                    label="To Date"
                    name="effectTo"
                    startYear={2000}
                    endYear={2050}
                    disabled={!form.getValues("effectFrom")}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    radius="sm"
                    className="w-full mt-5"
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default Rent;
