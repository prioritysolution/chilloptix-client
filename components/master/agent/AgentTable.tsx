"use client";

import {
  AgentTableData,
  AgentTableProps,
} from "@/container/master/agent/AgentTypes";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

interface AgentState {
  agentData: AgentTableData[];
}

interface RootState {
  agent: AgentState;
}

const AgentTable: FC<AgentTableProps> = ({ handleEditData }) => {
  const agentData: AgentTableData[] = useSelector(
    (state: RootState) => state?.agent?.agentData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        agentData.length > 0 && (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={1}
              total={10}
              // onChange={(page) => setPage(page)}
            />
          </div>
        )
      }
    >
      <TableHeader>
        <TableColumn>Serial No.</TableColumn>
        <TableColumn align="center">Agent Name</TableColumn>
        <TableColumn align="center">Guardian Name</TableColumn>
        <TableColumn align="center">Address</TableColumn>
        <TableColumn align="center">Mobile No.</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {agentData.map((data, index) => (
          <TableRow key={data.Id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.Agent_Name}</TableCell>
            <TableCell>{data.Relation_Name}</TableCell>
            <TableCell>{data.Address}</TableCell>
            <TableCell>{data.Mobile}</TableCell>
            <TableCell align="center" className=" flex justify-center">
              <Button
                className="flex text-center items-center gap-3"
                variant="shadow"
                color="secondary"
                onPress={() => handleEditData(data)}
              >
                Edit
                <FaRegEdit />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AgentTable;
