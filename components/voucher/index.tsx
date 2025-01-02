"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, Divider } from "@nextui-org/react";
import { FC } from "react";
import { Form } from "@/components/ui/form";
import InputField from "@/common/formFields/InputField";
import { DatePickerField } from "@/common/formFields/DatePickerField";
import { VoucherProps } from "@/container/voucher/VoucherTypes";
import RadioField from "@/common/formFields/RadioFields";
import DropdownField from "@/common/formFields/DropdownField";
import { useSelector } from "react-redux";
import SuccessMessage from "@/common/successMessage";

interface VoucherLedgerData {
  Id: number;
  Ledger_Name: string;
}

interface VoucherState {
  ledgerData: VoucherLedgerData[];
}

interface RootState {
  voucher: VoucherState;
}

const Voucher: FC<VoucherProps> = ({
  loading,
  form,
  handleSubmit,
  showSuccessMessage,
  setShowSuccessMessage,
  successMessage,
}) => {
  const ledgerData: VoucherLedgerData[] = useSelector(
    (state: RootState) => state?.voucher?.ledgerData
  );

  const voucherTypeOptions = [
    {
      value: "R",
      label: "Receipt",
    },
    {
      value: "P",
      label: "Payment",
    },
  ];

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Voucher Entry</h3>

        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 ">
          <div className="w-full flex justify-center">
            <Form {...form}>
              <form
                className="w-full lg:w-[600px] border-2 border-primary rounded-md py-5 flex flex-col gap-5 items-center"
                autoComplete="off"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <h3 className="justify-center text-2xl font-medium">
                  Add New Voucher
                </h3>
                <Divider />
                <div className="w-full flex flex-col gap-3 px-5 ">
                  <DatePickerField
                    control={form.control}
                    label="Voucher Date"
                    name="date"
                    startYear={2000}
                    endYear={2050}
                  />

                  <RadioField
                    control={form.control}
                    name="voucherType"
                    label="Voucher Type"
                    options={voucherTypeOptions}
                    orientation="horizontal"
                  />

                  <InputField
                    control={form.control}
                    name="manualVoucherNo"
                    label="Manual Voucher No."
                  />

                  <InputField
                    control={form.control}
                    name="particular"
                    label="Particular"
                  />

                  <DropdownField
                    control={form.control}
                    name="ledger"
                    options={ledgerData}
                    label="Under Ledger"
                    optionLabelKey="Ledger_Name"
                  />

                  <InputField
                    control={form.control}
                    name="amount"
                    label="Amount"
                    type="number"
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

      <SuccessMessage
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        showNextButton={false}
      />
    </div>
  );
};
export default Voucher;
