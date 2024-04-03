"use client";
import React, { useEffect } from "react";
import useLoginStore from "../../stores/login-store";
import { useRouter } from "next/navigation";
import LoginForm from "./login-form";

function LoginLayout() {
  const { loggedIn } = useLoginStore();
  const router = useRouter();
  useEffect(() => {
    if (loggedIn || localStorage.getItem("loggedIn") === "true")
      router.push("/admin");
  }, []);

  return (
    <>
      <h1 className="text-3xl text-center my-10">Log In</h1>
      <LoginForm />
    </>
  );
}

export default LoginLayout;
