"use client";

import { DatePickerField } from "@/common/formFields/DatePickerField";
import { Form } from "@/components/ui/form";
import { CollectionRegisterFormProps } from "@/container/generalReport/collectionRegister/CollectionRegisterTypes";
import { Button } from "@nextui-org/react";
import { FC } from "react";

const CollectionRegisterForm: FC<CollectionRegisterFormProps> = ({
  loading,
  form,
  handleSubmit,
  handleDownloadPdf,
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-5 "
        autoComplete="off"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center w-full gap-5 gap-y-3 border-2 p-5 border-primary rounded-md">
          <DatePickerField
            control={form.control}
            name="fromDate"
            label="From Date"
            startYear={2000}
            endYear={2050}
          />

          <DatePickerField
            control={form.control}
            name="toDate"
            label="To Date"
            startYear={2000}
            endYear={2050}
          />
        </div>

        <div className="flex gap-10 justify-end">
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

          <Button
            color="primary"
            size="lg"
            radius="sm"
            className="w-full sm:w-1/5 self-end"
            isLoading={loading}
            isDisabled={loading}
            onPress={handleDownloadPdf}
          >
            Download
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default CollectionRegisterForm;
