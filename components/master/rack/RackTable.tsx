"use client";

import {
  RackTableData,
  RackTableProps,
} from "@/container/master/rack/RackTypes";
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

interface RackState {
  rackData: RackTableData[];
}

interface RootState {
  rack: RackState;
}

const RackTable: FC<RackTableProps> = ({ handleEditData }) => {
  const rackData: RackTableData[] = useSelector(
    (state: RootState) => state?.rack?.rackData
  );

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        rackData.length > 0 && (
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
        <TableColumn align="center">Rack No.</TableColumn>
        <TableColumn align="center">Rack Name</TableColumn>
        <TableColumn align="center">Capacity</TableColumn>
        <TableColumn align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data found."}>
        {rackData.map((data, index) => (
          <TableRow key={data.Id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.Rack_No}</TableCell>
            <TableCell>{data.Rack_Name}</TableCell>
            <TableCell>{data.Capacity}</TableCell>
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
export default RackTable;
