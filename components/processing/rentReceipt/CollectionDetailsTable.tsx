"use client";

import { CollectionDetailsTableProps } from "@/container/processing/rentReceipt/RentReceiptTypes";
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

const CollectionDetailsTable: FC<CollectionDetailsTableProps> = ({
  handleDeleteCollection,
  collectionDetailsTableData,
}) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Serial No.</TableColumn>
        <TableColumn align="center">Balance Quantity</TableColumn>
        <TableColumn align="center">Release Quantity</TableColumn>
        <TableColumn align="center">Basic Rent</TableColumn>
        <TableColumn align="center">Insurance</TableColumn>
        <TableColumn align="center">RMS Fees</TableColumn>
        <TableColumn align="center">Drying Amount</TableColumn>
        <TableColumn align="center">Total Amount</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {collectionDetailsTableData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data?.balanceQuantity}</TableCell>
            <TableCell>{data?.releaseQuantity}</TableCell>
            <TableCell>{data?.basicRent}</TableCell>
            <TableCell>{data?.insurance}</TableCell>
            <TableCell>{data?.rmsFees}</TableCell>
            <TableCell>{data?.dryingAmount}</TableCell>
            <TableCell>{data?.totalAmount}</TableCell>
            <TableCell align="center" className=" flex justify-center">
              <Button
                className=" text-2xl text-danger"
                variant="flat"
                color="danger"
                radius="sm"
                onPress={() => handleDeleteCollection(data.rackId)}
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
export default CollectionDetailsTable;
