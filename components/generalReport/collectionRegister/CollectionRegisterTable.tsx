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
import { CollectionRegisterTableProps } from "@/container/generalReport/collectionRegister/CollectionRegisterTypes";

const CollectionRegisterTable: FC<CollectionRegisterTableProps> = ({
  collectionRegisterTableData,
  totalQuantity,
  totalBasic,
  totalInsurance,
  totalRms,
  totalDrying,
  totalAdvance,
}) => {
  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        collectionRegisterTableData?.length > 0 && (
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
        <TableColumn align="center">Release Date</TableColumn>
        <TableColumn align="center">Customer Name</TableColumn>
        <TableColumn align="center">Address</TableColumn>
        <TableColumn align="center">Mobile</TableColumn>
        <TableColumn align="center">Quantity</TableColumn>
        <TableColumn align="center">Basic</TableColumn>
        <TableColumn align="center">Insurance</TableColumn>
        <TableColumn align="center">RMS Fees</TableColumn>
        <TableColumn align="center">Drying Fees</TableColumn>
        <TableColumn align="center">Advance Amount</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        <>
          {collectionRegisterTableData?.map((data, index) => (
            <TableRow key={index} className="border-b h-12">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {data.Rel_Date
                  ? format(new Date(data.Rel_Date), "dd-MM-yyyy")
                  : ""}
              </TableCell>
              <TableCell>{data?.Cust_Name || ""}</TableCell>
              <TableCell>{data?.Address || ""}</TableCell>
              <TableCell>{data?.Mobile || ""}</TableCell>
              <TableCell>{data?.Qnty || ""}</TableCell>
              <TableCell>{data?.Basic || ""}</TableCell>
              <TableCell>{data?.Insurance || ""}</TableCell>
              <TableCell>{data?.Rms_Fee || ""}</TableCell>
              <TableCell>{data?.Drying_Fee || ""}</TableCell>
              <TableCell>{data?.Adv_Amt || ""}</TableCell>
            </TableRow>
          ))}
          {collectionRegisterTableData?.length > 0 && (
            <TableRow key="grand-total" className="border-b h-12">
              <TableCell
                aria-colspan={5}
                colSpan={5}
                align="center"
                className="text-center text-lg font-medium"
              >
                Grand Total
              </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="hidden"> </TableCell>
              <TableCell className="text-lg font-medium">
                {totalQuantity}
              </TableCell>
              <TableCell className="text-lg font-medium">
                {totalBasic}
              </TableCell>
              <TableCell className="text-lg font-medium">
                {totalInsurance}
              </TableCell>
              <TableCell className="text-lg font-medium">{totalRms}</TableCell>
              <TableCell className="text-lg font-medium">
                {totalDrying}
              </TableCell>
              <TableCell className="text-lg font-medium">
                {totalAdvance}
              </TableCell>
            </TableRow>
          )}
        </>
      </TableBody>
    </Table>
  );
};

export default CollectionRegisterTable;
