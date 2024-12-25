"use client";

import { RackPostingTableProps } from "@/container/processing/rackPosting/RackPostingTypes";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FC } from "react";
import { MdDeleteForever } from "react-icons/md";

const RackPostingTable: FC<RackPostingTableProps> = ({
  rackPostingTableData,
  handleDeleteFromTable,
}) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Serial No.</TableColumn>
        <TableColumn align="center">Bond No.</TableColumn>
        <TableColumn align="center">Floor</TableColumn>
        <TableColumn align="center">Chamber</TableColumn>
        <TableColumn align="center">Rack</TableColumn>
        <TableColumn align="center">Pocket</TableColumn>
        <TableColumn align="center">Pack</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {rackPostingTableData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.bondNo}</TableCell>
            <TableCell>{data.floorName}</TableCell>
            <TableCell>{data.chamberName}</TableCell>
            <TableCell>{data.rackName}</TableCell>
            <TableCell>{data.pocketName}</TableCell>
            <TableCell>{data.pack}</TableCell>
            <TableCell align="center" className=" flex justify-center">
              <Button
                className=" text-2xl text-danger"
                variant="shadow"
                color="secondary"
                radius="sm"
                onPress={() => handleDeleteFromTable(index)}
              >
                <MdDeleteForever />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default RackPostingTable;
