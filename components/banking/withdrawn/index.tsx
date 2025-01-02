"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, Divider } from "@nextui-org/react";
import { FC } from "react";
import { Form } from "@/components/ui/form";
import InputField from "@/common/formFields/InputField";
import { DatePickerField } from "@/common/formFields/DatePickerField";
import DropdownField from "@/common/formFields/DropdownField";
import { useSelector } from "react-redux";
import SuccessMessage from "@/common/successMessage";
import { WithdrawnProps } from "@/container/banking/withdrawn/WithdrawnTypes";

interface BankAccountData {
  Id: number;
  Bank_Name: string;
  Branch_Name: string;
  Bank_IFSC: string;
  Account_No: string;
}

interface BankAccountState {
  bankAccountData: BankAccountData[];
}

interface RootState {
  bankAccount: BankAccountState;
}

const Withdrawn: FC<WithdrawnProps> = ({
  loading,
  form,
  handleSubmit,
  showSuccessMessage,
  setShowSuccessMessage,
  successMessage,
}) => {
  const bankAccountData: { Id: number; Label: string }[] = useSelector(
    (state: RootState) =>
      state?.bankAccount?.bankAccountData?.map((data) => ({
        Id: data.Id,
        Label: `${data.Bank_Name} - ${data.Account_No}`,
      }))
  );

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Bank Withdrawn</h3>

        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 ">
          <div className="w-full flex justify-center">
            <Form {...form}>
              <form
                className="w-full lg:w-[600px] border-2 border-primary rounded-md py-5 flex flex-col gap-5 items-center"
                autoComplete="off"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <h3 className="justify-center text-2xl font-medium">
                  Add Withdrawn
                </h3>
                <Divider />
                <div className="w-full flex flex-col gap-3 px-5 ">
                  <DatePickerField
                    control={form.control}
                    label="Withdrawn Date"
                    name="date"
                    startYear={2000}
                    endYear={2050}
                  />

                  <DropdownField
                    control={form.control}
                    name="bankId"
                    options={bankAccountData}
                    label="Bank"
                    optionLabelKey="Label"
                  />

                  <InputField
                    control={form.control}
                    name="availableBalance"
                    label="Available Balance"
                    disabled
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
export default Withdrawn;
