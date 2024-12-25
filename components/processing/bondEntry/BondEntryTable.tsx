"use client";

import { BondEntryTableProps } from "@/container/processing/bondEntry/BondEntryTypes";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format } from "date-fns";
import { FC } from "react";
import { MdDeleteForever } from "react-icons/md";

const BondEntryTable: FC<BondEntryTableProps> = ({
  bondTableData,
  handleDeleteFromTable,
}) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Serial No.</TableColumn>
        <TableColumn align="center">Booking No.</TableColumn>
        <TableColumn align="center">Bond Date</TableColumn>
        <TableColumn align="center">No. Of Package</TableColumn>
        <TableColumn align="center">Net Weight</TableColumn>
        <TableColumn align="center">Verified</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {bondTableData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.bookingNo}</TableCell>
            <TableCell>
              {data.date && format(data.date, "dd-MM-yyyy")}
            </TableCell>
            <TableCell>{data.noOfPackages}</TableCell>
            <TableCell>{data.netWeight}</TableCell>
            <TableCell>{data.verified ? "Yes" : "No"}</TableCell>
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
export default BondEntryTable;
