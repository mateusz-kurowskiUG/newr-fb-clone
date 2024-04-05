"use client";
import React from "react";
import useLoginStore from "../../stores/login-store";
import { useRouter } from "next/navigation";
import LoginForm from "./login-form";
import useCheckAuth from "../../hooks/useCheckAuth";

function LoginLayout() {
  const { setLoggedIn } = useLoginStore();
  const router = useRouter();
  const { data, isPending } = useCheckAuth();
  if (isPending) return <div>Loading...</div>;

  if (data) {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
    router.push("/admin");
    return;
  }

  return (
    <>
      <h1 className="text-3xl text-center my-10">Log In</h1>
      <LoginForm />
    </>
  );
}

export default LoginLayout;
