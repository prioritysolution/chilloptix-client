"use client";

import {
  ChamberTableData,
  ChamberTableProps,
} from "@/container/master/chamber/ChamberTypes";
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
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

interface ChamberState {
  chamberData: ChamberTableData[];
}

interface RootState {
  chamber: ChamberState;
}

const ChamberTable: FC<ChamberTableProps> = ({ handleEditData }) => {
  const chamberData: ChamberTableData[] = useSelector(
    (state: RootState) => state?.chamber?.chamberData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        chamberData.length > 0 && (
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
        <TableColumn align="center">Chamber No.</TableColumn>
        <TableColumn align="center">Chamber Name</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {chamberData.map((data, index) => (
          <TableRow key={data.Id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.Chamber_No}</TableCell>
            <TableCell>{data.Chamber_Name}</TableCell>
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
export default ChamberTable;
