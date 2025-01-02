"use client";
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
import { useSelector } from "react-redux";
import {
  BookingSearchTableData,
  BookingSearchTableProps,
} from "./BookingSearchTypes";
import { format } from "date-fns";

interface BookingStateState {
  bookingSearchData: BookingSearchTableData[];
}

interface RootState {
  bookingSearch: BookingStateState;
}

const BookingSearchTable: FC<BookingSearchTableProps> = ({
  setIsBookingModalOpen,
  handleSelectData,
}) => {
  const searchTableData: BookingSearchTableData[] = useSelector(
    (state: RootState) => state?.bookingSearch?.bookingSearchData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        // agentData.length > 0 && (
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
        // )
      }
    >
      <TableHeader>
        <TableColumn>Serial No.</TableColumn>
        <TableColumn align="center">Book Date</TableColumn>
        <TableColumn align="center">Book No</TableColumn>
        <TableColumn align="center">Name</TableColumn>
        <TableColumn align="center">Guardian Name</TableColumn>
        <TableColumn align="center">Village</TableColumn>
        <TableColumn align="center">Mobile</TableColumn>
        <TableColumn align="center">Book Quantity</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {searchTableData &&
          searchTableData.map((data, index) => (
            <TableRow
              key={data.Id}
              className="cursor-pointer hover:bg-default-100 transition-all duration-100"
              onClick={() => {
                handleSelectData(data);
                setIsBookingModalOpen(false);
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {data.Bok_Date && format(data.Bok_Date, "dd-MM-yyyy")}
              </TableCell>
              <TableCell>{data?.Book_No}</TableCell>
              <TableCell>{data?.Cust_Name}</TableCell>
              <TableCell>{data?.Relation_Name}</TableCell>
              <TableCell>{data?.Village}</TableCell>
              <TableCell>{data?.Mobile}</TableCell>
              <TableCell>{data?.Book_Qnty}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
export default BookingSearchTable;
