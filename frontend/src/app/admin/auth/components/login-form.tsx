"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import useLoginForm from "../../hooks/useLoginForm";
import { z } from "zod";
import loginFormSchema from "../schema/login-form-schema";

import adminAxios from "../../axios/admin-axios";
import useLoginStore from "../../stores/login-store";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Toaster } from "@/components/ui/toaster";
// interface message with type
function LoginForm() {
  const form = useLoginForm();
  const { setLoggedIn } = useLoginStore();
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await adminAxios.post("login/", values);
      toast({
        variant: "success",
        title: "Login successful.",
        description: "You will be redirected soon.",
      });
      setTimeout(() => {
        console.log("redirecting");
      }, 1000);
      // check cookies
      // setLoggedIn(true);
    } catch (e) {
      if (e.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Invalid credentials!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Some other error occured!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-10 m-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="btn self-end">
            <Button
              disabled={!form.formState.isDirty || !form.formState.isValid}
              className="text-foreground text-end mb-4"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
}

export default LoginForm;
