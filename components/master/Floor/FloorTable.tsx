"use client";

import {
  FloorTableData,
  FloorTableProps,
} from "@/container/master/floor/FloorTypes";
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

interface FloorState {
  floorData: FloorTableData[];
}

interface RootState {
  floor: FloorState;
}

const FloorTable: FC<FloorTableProps> = ({ handleEditData }) => {
  const floorData: FloorTableData[] = useSelector(
    (state: RootState) => state?.floor?.floorData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        floorData.length > 0 && (
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
        <TableColumn align="center">Floor No.</TableColumn>
        <TableColumn align="center">Floor Name</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {floorData.map((data, index) => (
          <TableRow key={data.Id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.Floor_No}</TableCell>
            <TableCell>{data.Floor_Name}</TableCell>
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
export default FloorTable;
