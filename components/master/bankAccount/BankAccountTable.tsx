"use client";

import { BankAccountTableData } from "@/container/master/bankAccount/BankAccountTypes";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSelector } from "react-redux";

interface BankAccountState {
  bankAccountData: BankAccountTableData[];
}

interface RootState {
  bankAccount: BankAccountState;
}

const BankAccountTable = () => {
  const bankAccountData: BankAccountTableData[] = useSelector(
    (state: RootState) => state?.bankAccount?.bankAccountData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        bankAccountData.length > 0 && (
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
        <TableColumn align="center">Bank Name</TableColumn>
        <TableColumn align="center">Branch Name</TableColumn>
        <TableColumn align="center">IFSC</TableColumn>
        <TableColumn align="center">Account No.</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {bankAccountData.map((data, index) => (
          <TableRow key={data.Id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.Bank_Name}</TableCell>
            <TableCell>{data.Branch_Name}</TableCell>
            <TableCell>{data.Bank_IFSC}</TableCell>
            <TableCell>{data.Account_No}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default BankAccountTable;
