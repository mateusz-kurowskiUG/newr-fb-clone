"use client";
import React from "react";
import useLoginStore from "../../stores/login-store";
import { useRouter } from "next/navigation";
import LoginForm from "./login-form";

function LoginLayout() {
  const router = useRouter();
  const { loggedIn } = useLoginStore();
  if (loggedIn) router.push("/admin");
  return <LoginForm />;
}

export default LoginLayout;
