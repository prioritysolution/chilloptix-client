"use client";

import { DatePickerField } from "@/common/formFields/DatePickerField";
import DropdownField from "@/common/formFields/DropdownField";
import InputField from "@/common/formFields/InputField";
import { Form } from "@/components/ui/form";
import { BankAccountFormProps } from "@/container/master/bankAccount/BankAccountTypes";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC, FormEvent } from "react";
import { useSelector } from "react-redux";

interface LedgerTableData {
  Id: number;
  Ledger_Name: string;
}

interface LedgerState {
  bankLedgerData: LedgerTableData[];
}

interface RootState {
  bankAccount: LedgerState;
}

const BankAccountForm: FC<BankAccountFormProps> = ({
  addBankAccountLoading,
  // updateBankAccountLoading,
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
  // editData,
  disableOpeningBalance,
}) => {
  const ledgerData: LedgerTableData[] = useSelector(
    (state: RootState) => state?.bankAccount?.bankLedgerData
  );

  const handleStopPropagation = (e: FormEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      backdrop="blur"
      size="xl"
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        <Form {...form}>
          <form
            className="w-full h-full flex flex-col gap-5 justify-between py-2"
            autoComplete="off"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <ModalHeader className="justify-center text-2xl font-medium">
              {/* {editData && Object.keys(editData).length > 0
                ? "Edit"
                : "Add New"}{" "} */}
              Add New Bank Account
            </ModalHeader>
            <Divider />
            <ModalBody>
              <InputField
                control={form.control}
                name="bankName"
                label="Bank Name"
              />

              <InputField
                control={form.control}
                name="branchName"
                label="Branch Name"
              />

              <InputField control={form.control} name="ifsc" label="IFSC" />

              <InputField
                control={form.control}
                name="accountNo"
                label="Account No."
                type="number"
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
                name="openingBalance"
                label="Opening Balance"
                type="number"
                disabled={disableOpeningBalance}
              />

              <div onFocus={handleStopPropagation}>
                <DatePickerField
                  control={form.control}
                  label="Opening Date"
                  name="openingDate"
                  startYear={2000}
                  endYear={2050}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => setIsOpen(false)}
                size="lg"
                radius="sm"
                className="w-32"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                size="lg"
                radius="sm"
                className="w-32"
                isLoading={addBankAccountLoading}
                isDisabled={addBankAccountLoading}
              >
                {/* {editData && Object.keys(editData).length > 0 ? "Edit" : "Add"} */}
                Add
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
};
export default BankAccountForm;
