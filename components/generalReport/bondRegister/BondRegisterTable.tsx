"use client";

import { FC } from "react";

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format } from "date-fns";
import { BondRegisterTableProps } from "@/container/generalReport/bondRegister/BondRegisterTypes";

const BondRegisterTable: FC<BondRegisterTableProps> = ({
  bondRegisterTableData,
  totalPack,
  totalQuantity,
}) => {
  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        bondRegisterTableData?.length > 0 && (
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
        <TableColumn align="center">Issue Date</TableColumn>
        <TableColumn align="center">Bond No.</TableColumn>
        <TableColumn align="center">Book No.</TableColumn>
        <TableColumn align="center">Issue Pack</TableColumn>
        <TableColumn align="center">Book Quantity</TableColumn>
        <TableColumn align="center">Customer Name</TableColumn>
        <TableColumn align="center">Address</TableColumn>
        <TableColumn align="center">Mobile</TableColumn>
        <TableColumn align="center">Status</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        <>
          {bondRegisterTableData?.map((data, index) => (
            <TableRow key={data.Id} className="border-b h-12">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {data.Issue_Date && format(data.Issue_Date, "dd-MM-yyyy")}
              </TableCell>
              <TableCell>{data?.Bond_No}</TableCell>
              <TableCell>{data?.Book_No}</TableCell>
              <TableCell>{data?.Issue_Pack}</TableCell>
              <TableCell>{data?.Issue_Qnty}</TableCell>
              <TableCell>{data?.Cust_Name}</TableCell>
              <TableCell>{data?.Address}</TableCell>
              <TableCell>{data?.Mobile}</TableCell>
              <TableCell>{data?.Rack_Status}</TableCell>
            </TableRow>
          ))}
          {bondRegisterTableData?.length > 0 && (
            <TableRow key="grand-total" className="border-b h-12">
              <TableCell
                aria-colspan={4}
                colSpan={4}
                align="center"
                className="text-center text-lg font-medium"
              >
                Grand Total
              </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="text-lg font-medium">
                {totalPack.toFixed(2)}
              </TableCell>
              <TableCell className="text-lg font-medium">
                {totalQuantity.toFixed(2)}
              </TableCell>
              <TableCell className="text-lg font-medium"> </TableCell>
              <TableCell className="text-lg font-medium"> </TableCell>
              <TableCell className="text-lg font-medium"> </TableCell>
              <TableCell className="text-lg font-medium"> </TableCell>
            </TableRow>
          )}
        </>
      </TableBody>
    </Table>
  );
};
export default BondRegisterTable;
