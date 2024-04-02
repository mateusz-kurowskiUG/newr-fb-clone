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
import ILoginMessage from "../models/ILoginMessages";
import ErrorBoxMessage from "./error-box-message";
import cuid2 from "@paralleldrive/cuid2";
import useLoginStore from "../../stores/login-store";
import { toast, useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Toaster } from "@/components/ui/toaster";
// interface message with type
function LoginForm() {
  const [messages, setMessages] = useState<ILoginMessage[]>([]);
  const form = useLoginForm();
  const { setLoggedIn } = useLoginStore();
  const toast = useToast();
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setMessages([]);
    try {
      const response = await adminAxios.post("login/", values);
      if (response.status !== 200) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setMessages((messages) => [
          ...messages,
          {
            type: "error",
            messageText: "An error occurred, but promise is resolved.",
          },
        ]);
        return;
      }
      setMessages((messages) => [
        ...messages,
        { type: "success", messageText: "Login successful" },
      ]);
      // setLoggedIn(true);
    } catch (e) {
      if (e.response.status === 401) {
        setMessages((messages) => [
          ...messages,
          { type: "error", messageText: "Wrong credentials." },
        ]);
      } else {
        setMessages((messages) => [
          ...messages,
          { type: "error", messageText: "Some error occurred." },
        ]);
      }
    }
  };

  return (
    <>
      <div className="response-messages h-10">
        {messages.length
          ? messages.map((message) => (
              <ErrorBoxMessage key={cuid2.createId()} message={message} />
            ))
          : null}
      </div>
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
              className="text-foreground text-end"
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
