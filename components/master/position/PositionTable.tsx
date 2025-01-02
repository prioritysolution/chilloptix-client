"use client";

import {
  PositionTableData,
  PositionTableProps,
} from "@/container/master/position/PositionTypes";
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

interface PositionState {
  positionData: PositionTableData[];
}

interface RootState {
  position: PositionState;
}

const PositionTable: FC<PositionTableProps> = ({ handleEditData }) => {
  const positionData: PositionTableData[] = useSelector(
    (state: RootState) => state?.position?.positionData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        positionData.length > 0 && (
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
        <TableColumn align="center">Position Name</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {positionData.map((data, index) => (
          <TableRow key={data.Id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.Position_Name}</TableCell>
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
export default PositionTable;
