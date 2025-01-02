"use client";

import { RentReceiptTableProps } from "@/container/processing/rentReceipt/RentReceiptTypes";
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
import { FaHandHoldingUsd } from "react-icons/fa";

const RentReceiptTable: FC<RentReceiptTableProps> = ({
  rentReceiptTableData,
  handleOpenRentDetails,
  collectionDetailsTableData,
}) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Serial No.</TableColumn>
        <TableColumn align="center">Book No.</TableColumn>
        <TableColumn align="center">Bond No.</TableColumn>
        <TableColumn align="center">Issue Date</TableColumn>
        <TableColumn align="center">Floor</TableColumn>
        <TableColumn align="center">Chamber</TableColumn>
        <TableColumn align="center">Rack</TableColumn>
        <TableColumn align="center">Pocket</TableColumn>
        <TableColumn align="center">Position</TableColumn>
        <TableColumn align="center">Pack</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {rentReceiptTableData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data?.Book_No}</TableCell>
            <TableCell>{data?.Bond_No}</TableCell>
            <TableCell>
              {data.Issue_Date && format(data.Issue_Date, "dd-MM-yyyy")}
            </TableCell>
            <TableCell>{data?.Flor_Name}</TableCell>
            <TableCell>{data?.Chamber_Name}</TableCell>
            <TableCell>{data?.Rack_Name}</TableCell>
            <TableCell>{data?.Pocket_Name}</TableCell>
            <TableCell>{data?.Position}</TableCell>
            <TableCell>{data?.Pack}</TableCell>
            <TableCell align="center" className=" flex justify-center">
              <Button
                className=" text-2xl text-primary-600 bg-blue-100"
                variant="flat"
                // color="primary"
                radius="sm"
                isDisabled={collectionDetailsTableData.some(
                  (item) => item.rackId === data.Rack_Id?.toString()
                )}
                onPress={() => handleOpenRentDetails(data)}
              >
                <FaHandHoldingUsd />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default RentReceiptTable;
