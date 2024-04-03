"use client";
import React from "react";
import useLoginStore from "../stores/login-store";
import useCheckAuth from "../hooks/useCheckAuth";
import { useRouter } from "next/navigation";

function LoggedInGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loggedIn, setLoggedIn } = useLoginStore();
  const { error, isPending, isLoading } = useCheckAuth();

  if (isPending) return <div>Pending...</div>;
  if (isLoading) return <div>Loading...</div>;

  if (error) {
    console.log("setting logout");
    if (loggedIn) setLoggedIn(false);
    const item = localStorage.getItem("loggedIn");
    console.log(item);

    if (localStorage.getItem("loggedIn") === "true")
      localStorage.removeItem("loggedIn");
    router.push("/admin/auth");
  } else {
    if (!loggedIn) setLoggedIn(true);

    if (localStorage.getItem("loggedIn") !== "true")
      localStorage.setItem("loggedIn", "true");
  }
  return <>{children}</>;
}

export default LoggedInGuard;
