"use client";

import { FC, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";

import InputField from "@/common/formFields/InputField";
import { Form } from "@/components/ui/form";
import { LoginProps } from "@/container/auth/login/LoginTypes";

const Login: FC<LoginProps> = ({ loading, form, handleSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://picsum.photos/1920/1080')`,
      }}
    >
      {/* Blur Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>

      {/* Centered Content */}
      <Card
        className="w-[600px] flex items-center justify-center py-3"
        radius="lg"
        shadow="sm"
      >
        <CardHeader>
          <h4 className="font-semibold text-3xl text-center w-full">
            Welcome to ChillOptix
          </h4>
        </CardHeader>
        <Divider className="h-[2px] my-3" />
        <CardBody className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-4 sm:px-5"
              autoComplete="off"
            >
              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
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

              <Link
                showAnchorIcon
                color="primary"
                href="/forgotPassword"
                className="self-end"
              >
                Forgot Password
              </Link>

              <Button
                type="submit"
                color="primary"
                radius="sm"
                size="lg"
                className=" text-base w-fit self-end px-10"
                isLoading={loading}
                isDisabled={loading}
              >
                Login
              </Button>
            </form>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
