"use client";

import {
  PocketTableData,
  PocketTableProps,
} from "@/container/master/pocket/PocketTypes";
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

interface PocketState {
  pocketData: PocketTableData[];
}

interface RootState {
  pocket: PocketState;
}

const PocketTable: FC<PocketTableProps> = ({ handleEditData }) => {
  const pocketData: PocketTableData[] = useSelector(
    (state: RootState) => state?.pocket?.pocketData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        pocketData.length > 0 && (
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
        <TableColumn align="center">Pocket No.</TableColumn>
        <TableColumn align="center">Pocket Name</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {pocketData.map((data, index) => (
          <TableRow key={data.Id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.Pocket_No}</TableCell>
            <TableCell>{data.Pocket_Name}</TableCell>
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
export default PocketTable;
