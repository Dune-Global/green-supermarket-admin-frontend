"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { adminLogin } from "@/helpers";
import { ToastAction } from "../common/ui/toast/toast";
import { useToast } from "../common/ui/toast/use-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button,
  Checkbox,
} from "@/components/common";

type Props = {};

const formSchema = z.object({
  empId: z
    .string()
    .min(1, { message: "should have at least one character" })
    .max(5, { message: "can't contain more than 4 characters" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "password must contain at least 8 characters" })
    .max(50, { message: "password can't contain more than 50 characters" }),
});

const formBaseStyles = {
  inputFields: "border-[1px] border-gray-50 text-gray-900 placeholder-gray-200",
  errorMessages: "text-red-400 font-medium text-sm",
};

const LoginModal = (props: Props) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      empId: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { empId, password } = values;
      const responseData = await adminLogin(parseInt(empId), password);
      setIsLoading(false);
      localStorage.setItem("jwtToken", responseData.token);
      console.log(responseData.token);
      router.push("/order-review");
      toast({
        variant: "default",
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Employee Id or Password is incorrect.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.error(error);
      setIsLoading(false);
    }
  }

  const handleEyeClick = () => {
    setShowPassword(!showPassword);
  };

  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div>
        <h1 className="uppercase text-green-400 font-medium text-2xl lg:text-3xl">
          green <span className="text-gray-900">supermarket</span>
        </h1>
      </div>

      <div className="flex flex-col gap-2 p-6 items-center justify-center shadow-xl rounded-lg lg:w-[30rem]">
        <h2 className="font-medium text-xl mb-2 lg:text-2xl">Admin Sign In</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full px-2 mb-2"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="empId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Employee Id"
                        className={`${formBaseStyles.inputFields}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage
                      className={`${formBaseStyles.errorMessages}`}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className={`${formBaseStyles.inputFields}`}
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute right-2 top-[0.65rem] text-xl"
                        type="button"
                        onClick={handleEyeClick}
                      >
                        {showPassword ? (
                          <EyeOff
                            size={22}
                            strokeWidth={2}
                            className="text-gray-200"
                          />
                        ) : (
                          <Eye
                            size={22}
                            strokeWidth={2}
                            className="text-gray-200"
                          />
                        )}
                      </button>
                    </div>
                    <FormMessage
                      className={`${formBaseStyles.errorMessages}`}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between w-full text-sm text-gray-600">
              <div className="flex items-center gap-1 lg:gap-2">
                <Checkbox id="terms" />
                <p>Remember me</p>
              </div>
              <div>
                <a href="#" className="underline">
                  Forgot password
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full" loading={isLoading}>
              Log In
            </Button>

            <div className="text-sm text-center">
              <p className="text-gray-200">
                Don&apos;t have an account?{" "}
                <a href="#" className="text-gray-900 underline">
                  Contact the Super Admin
                </a>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginModal;
