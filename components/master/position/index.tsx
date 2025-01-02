"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import PositionTable from "./PositionTable";
import PositionForm from "./PositionForm";
import { PositionProps } from "@/container/master/position/PositionTypes";

const Position: FC<PositionProps> = ({
  addPositionLoading,
  updatePositionLoading,
  // loading,
  form,
  handleSubmit,
  isOpen,
  setIsOpen,
  editData,
  handleEditData,
}) => {
  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Position Master</h3>

        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 ">
          <div className="w-full flex flex-col items-center gap-5">
            <Button
              color="primary"
              size="lg"
              radius="sm"
              className="w-fit self-end"
              onPress={() => setIsOpen(true)}
            >
              Add Position
            </Button>

            <PositionForm
              addPositionLoading={addPositionLoading}
              updatePositionLoading={updatePositionLoading}
              form={form}
              handleSubmit={handleSubmit}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              editData={editData}
            />
            <div className="w-[300px] sm:w-full h-full flex flex-col border border-primary rounded-lg lg:p-5 gap-5">
              <PositionTable handleEditData={handleEditData} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default Position;
