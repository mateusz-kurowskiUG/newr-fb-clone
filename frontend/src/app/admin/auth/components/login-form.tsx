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
import axios from "axios";
// interface message with type
function LoginForm() {
  const [messages, setMessages] = useState<string[]>([]);
  const form = useLoginForm();

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        values,
      );
      if (response.status === 200) {
        setMessages((messages) => [...messages, "Login successful"]);
      } else {
        setMessages((messages) => [...messages, "Login failed"]);
      }
    } catch (e) {
      setMessages((messages) => [...messages, "Didn't work. Try again."]);
    }
  };

  return (
    <>
      {messages.length ? (
        <div className="response-messages">
          {messages.map((message, index) => (
            // change key and color if message is not error
            <p key={index} className="text-red-600 text-center my-4">
              {message}
            </p>
          ))}
        </div>
      ) : null}
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
            render={({ field, errors }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="errors"></div>
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
    </>
  );
}

export default LoginForm;
