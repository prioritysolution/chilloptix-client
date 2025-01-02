"use client";

import {
  LicenseRenewalTableData,
  LicenseRenewalTableProps,
} from "@/container/master/licenseRenewal/LicenseRenewalTypes";
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
import { format } from "date-fns";
import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

interface LicenseRenewalState {
  licenseRenewalData: LicenseRenewalTableData[];
}

interface RootState {
  licenseRenewal: LicenseRenewalState;
}

const LicenseRenewalTable: FC<LicenseRenewalTableProps> = ({
  handleEditData,
}) => {
  const licenseRenewalData: LicenseRenewalTableData[] = useSelector(
    (state: RootState) => state?.licenseRenewal?.licenseRenewalData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        licenseRenewalData &&
        licenseRenewalData.length > 0 && (
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
        <TableColumn align="center">From Date</TableColumn>
        <TableColumn align="center">To Date</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {licenseRenewalData &&
          licenseRenewalData.map((data, index) => (
            <TableRow key={data.Id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {data.Valid_Frm && format(data.Valid_Frm, "dd-MM-yyyy")}
              </TableCell>
              <TableCell>
                {data.Valid_Till && format(data.Valid_Till, "dd-MM-yyyy")}
              </TableCell>
              <TableCell align="center" className=" flex justify-center">
                <Button
                  className="flex text-center items-center gap-3"
                  variant="shadow"
                  color="secondary"
                  onPress={() => handleEditData(data)}
                >
                  Edit
                  <FaRegEdit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
export default LicenseRenewalTable;
