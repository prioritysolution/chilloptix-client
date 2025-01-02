"use client";

import { BookingRegisterTableProps } from "@/container/generalReport/bookingRegister/BookingRegisterTypes";
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

const BookingRegisterTable: FC<BookingRegisterTableProps> = ({
  bookingRegisterTableData,
  totalQuantity,
  totalAdvance,
}) => {
  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        bookingRegisterTableData?.length > 0 && (
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
        <TableColumn align="center">Book Date</TableColumn>
        <TableColumn align="center">Book No.</TableColumn>
        <TableColumn align="center">Book Quantity</TableColumn>
        <TableColumn align="center">Customer Name</TableColumn>
        <TableColumn align="center">Address</TableColumn>
        <TableColumn align="center">Mobile</TableColumn>
        <TableColumn align="center">Advance</TableColumn>
        <TableColumn align="center">Status</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        <>
          {bookingRegisterTableData?.map((data, index) => (
            <TableRow key={data.Id} className="border-b h-12">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {data.Bok_Date && format(data.Bok_Date, "dd-MM-yyyy")}
              </TableCell>
              <TableCell>{data?.Book_No}</TableCell>
              <TableCell>{data?.Book_Qnty}</TableCell>
              <TableCell>{data?.Cust_Name}</TableCell>
              <TableCell>{data?.Address}</TableCell>
              <TableCell>{data?.Mobile}</TableCell>
              <TableCell>{data?.Adv_Paid}</TableCell>
              <TableCell>{data?.Bond_Status}</TableCell>
            </TableRow>
          ))}
          {bookingRegisterTableData?.length > 0 && (
            <TableRow key="grand-total" className="border-b h-12">
              <TableCell
                aria-colspan={3}
                colSpan={3}
                align="center"
                className="text-center text-lg font-medium"
              >
                Grand Total
              </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="text-lg font-medium">
                {totalQuantity.toFixed(2)}
              </TableCell>
              <TableCell className="text-lg font-medium"> </TableCell>
              <TableCell className="text-lg font-medium"> </TableCell>
              <TableCell className="text-lg font-medium"> </TableCell>
              <TableCell className="text-lg font-medium">
                {totalAdvance.toFixed(2)}
              </TableCell>
              <TableCell className="text-lg font-medium"> </TableCell>
            </TableRow>
          )}
        </>
      </TableBody>
    </Table>
  );
};
export default BookingRegisterTable;
