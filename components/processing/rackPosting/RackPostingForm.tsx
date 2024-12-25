"use client";

import { DatePickerField } from "@/common/formFields/DatePickerField";
import DropdownField from "@/common/formFields/DropdownField";
import InputField from "@/common/formFields/InputField";
import TextareaField from "@/common/formFields/TextareaField";
import { Form } from "@/components/ui/form";
import { ChamberTableData } from "@/container/master/chamber/ChamberTypes";
import { FloorTableData } from "@/container/master/floor/FloorTypes";
import { PocketTableData } from "@/container/master/pocket/PocketTypes";
import { RackTableData } from "@/container/master/rack/RackTypes";
import { RackPostingFormProps } from "@/container/processing/rackPosting/RackPostingTypes";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

interface FloorState {
  floorData: FloorTableData[];
}

interface ChamberState {
  chamberData: ChamberTableData[];
}

interface RackState {
  rackData: RackTableData[];
}

interface PocketState {
  pocketData: PocketTableData[];
}

interface RootState {
  floor: FloorState;
  chamber: ChamberState;
  rack: RackState;
  pocket: PocketState;
}

const RackPostingForm: FC<RackPostingFormProps> = ({
  form,
  handleSubmit,
  setIsBondModalOpen,
  handleGetBondDataByBondNo,
  getBondDetailsLoading,
  rackPostingTableData,
  totalPack,
}) => {
  const floorData: FloorTableData[] = useSelector(
    (state: RootState) => state?.floor?.floorData
  );

  const chamberData: ChamberTableData[] = useSelector(
    (state: RootState) => state?.chamber?.chamberData
  );

  const rackData: RackTableData[] = useSelector(
    (state: RootState) => state?.rack?.rackData
  );

  const pocketData: PocketTableData[] = useSelector(
    (state: RootState) => state?.pocket?.pocketData
  );

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
            label="Bond No."
            name="bondNo"
            className="w-full lg:w-[380px]"
            endContent={
              <IoSearch
                className="text-2xl cursor-pointer"
                onClick={() => setIsBondModalOpen(true)}
              />
            }
          />

          <Button
            onPress={handleGetBondDataByBondNo}
            color="primary"
            size="lg"
            radius="sm"
            className="w-32 self-end"
            isLoading={getBondDetailsLoading}
            isDisabled={
              getBondDetailsLoading || rackPostingTableData.length > 0
            }
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
              label="Issue Date"
              name="issueDate"
              disabled
            />

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

            <TextareaField
              control={form.control}
              label="Address"
              name="address"
              disabled
            />

            <InputField
              control={form.control}
              label="Bond Quantity (KG)"
              name="bondQuantity"
              disabled
            />

            <InputField
              control={form.control}
              label="Bond Pack"
              name="bondPack"
              disabled
            />

            <DatePickerField
              control={form.control}
              label="Posting Date"
              name="date"
              startYear={2000}
              endYear={2050}
              disabled={rackPostingTableData.length > 0}
            />

            <DropdownField
              control={form.control}
              name="floorId"
              options={floorData}
              label="Floor"
              optionLabelKey="Floor_Name"
            />

            <DropdownField
              control={form.control}
              name="chamberId"
              options={chamberData}
              label="Chamber"
              optionLabelKey="Chamber_Name"
            />

            <DropdownField
              control={form.control}
              name="rackId"
              options={rackData}
              label="Rack"
              optionLabelKey="Rack_Name"
            />

            <DropdownField
              control={form.control}
              name="pocketId"
              options={pocketData}
              label="Pocket"
              optionLabelKey="Pocket_Name"
            />

            <InputField
              control={form.control}
              label="Pack"
              name="pack"
              type="number"
            />

            <div className="lg:col-span-2 xl:col-span-3 flex items-center justify-end pt-5">
              <Button
                type="submit"
                color="primary"
                size="lg"
                radius="sm"
                className="w-full lg:w-1/3 xl:w-1/5 self-end"
                isDisabled={
                  !!form.getValues("bondPack") &&
                  totalPack === Number(form.getValues("bondPack"))
                }
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
export default RackPostingForm;
