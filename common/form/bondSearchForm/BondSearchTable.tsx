"use client";
import {
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
import { BondSearchTableData, BondSearchTableProps } from "./BondSearchTypes";
import { format } from "date-fns";

interface BondStateState {
  bondSearchData: BondSearchTableData[];
}

interface RootState {
  bondSearch: BondStateState;
}

const BondSearchTable: FC<BondSearchTableProps> = ({
  setIsBondModalOpen,
  handleSelectData,
}) => {
  const searchTableData: BondSearchTableData[] = useSelector(
    (state: RootState) => state?.bondSearch?.bondSearchData
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
        <TableColumn align="center">Bond Date</TableColumn>
        <TableColumn align="center">Bond No.</TableColumn>
        <TableColumn align="center">Name</TableColumn>
        <TableColumn align="center">Guardian Name</TableColumn>
        <TableColumn align="center">Address</TableColumn>
        <TableColumn align="center">Mobile</TableColumn>
        <TableColumn align="center">Pack</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {searchTableData &&
          searchTableData.map((data, index) => (
            <TableRow
              key={index}
              className="cursor-pointer hover:bg-default-100 transition-all duration-100"
              onClick={() => {
                handleSelectData(data);
                setIsBondModalOpen(false);
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {data.Issue_Date && format(data.Issue_Date, "dd-MM-yyyy")}
              </TableCell>
              <TableCell>{data?.Bond_No}</TableCell>
              <TableCell>{data?.Cust_Name}</TableCell>
              <TableCell>{data?.Relation_Name}</TableCell>
              <TableCell>{data?.Address}</TableCell>
              <TableCell>{data?.Mobile}</TableCell>
              <TableCell>{data?.Issue_Pack}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
export default BondSearchTable;
