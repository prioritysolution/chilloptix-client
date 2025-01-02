"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, Divider } from "@nextui-org/react";
import { FC, useState } from "react";
import { Form } from "@/components/ui/form";
import InputField from "@/common/formFields/InputField";
import DropdownField from "@/common/formFields/DropdownField";
import { useSelector } from "react-redux";
import { AddUserProps } from "@/container/tools/addUser/AddUserTypes";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface UserRoleData {
  Id: number;
  Role_Name: string;
}

interface UserState {
  userRoleData: UserRoleData[];
}

interface RootState {
  userRole: UserState;
}

const AddUser: FC<AddUserProps> = ({ loading, form, handleSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const userRoleData: UserRoleData[] = useSelector(
    (state: RootState) => state?.userRole?.userRoleData
  );

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">AddUser Entry</h3>

        <ScrollArea className="w-full px-2 sm:px-10 2xl:px-20 ">
          <div className="w-full flex justify-center">
            <Form {...form}>
              <form
                className="w-full lg:w-[600px] border-2 border-primary rounded-md py-5 flex flex-col gap-5 items-center"
                autoComplete="off"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <h3 className="justify-center text-2xl font-medium">
                  Add New AddUser
                </h3>
                <Divider />
                <div className="w-full flex flex-col gap-3 px-5 ">
                  <InputField
                    control={form.control}
                    name="name"
                    label="User Name"
                  />

                  <InputField
                    control={form.control}
                    name="email"
                    label="User Email"
                  />

                  <InputField
                    control={form.control}
                    name="mobile"
                    label="User Mobile"
                    type="number"
                  />

                  <InputField
                    control={form.control}
                    name="password"
                    type={isVisible ? "text" : "password"}
                    label="Password"
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <IoEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />

                  <DropdownField
                    control={form.control}
                    name="role"
                    options={userRoleData || []}
                    label="Under Ledger"
                    optionLabelKey="Ledger_Name"
                  />

                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    radius="sm"
                    className="w-full mt-5"
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default AddUser;
