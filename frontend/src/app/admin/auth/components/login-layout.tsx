"use client";
import React from "react";
import useLoginStore from "../../stores/login-store";
import { useRouter } from "next/navigation";
import LoginForm from "./login-form";

function LoginLayout() {
  const router = useRouter();
  const { loggedIn } = useLoginStore();
  if (loggedIn || localStorage.getItem("loggedIn") === "true") {
    router.push("/admin");
  }

  return (
    <>
      <h1 className="text-3xl text-center my-10">Log In</h1>
      <LoginForm />
    </>
  );
}

export default LoginLayout;
