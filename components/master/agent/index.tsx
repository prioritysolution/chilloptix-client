"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentProps } from "@/container/master/agent/AgentTypes";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import AgentForm from "./AgentForm";
import AgentTable from "./AgentTable";

const Agent: FC<AgentProps> = ({
  addAgentLoading,
  updateAgentLoading,
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
        <h3 className="text-2xl font-semibold ">Agent Master</h3>

        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 ">
          <div className="w-full flex flex-col gap-5 items-center">
            <Button
              color="primary"
              size="lg"
              radius="sm"
              className="w-fit self-end"
              onPress={() => setIsOpen(true)}
            >
              Add Agent
            </Button>

            <AgentForm
              addAgentLoading={addAgentLoading}
              updateAgentLoading={updateAgentLoading}
              form={form}
              handleSubmit={handleSubmit}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              editData={editData}
            />
            <div className="w-[300px] sm:w-[400px] lg:w-[500px] xl:w-full h-full flex flex-col border border-primary rounded-lg lg:p-5 gap-5">
              <AgentTable handleEditData={handleEditData} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default Agent;
