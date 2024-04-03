"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useLoginStore from "../stores/login-store";

function AdminLayout() {
  const router = useRouter();
  const { loggedIn } = useLoginStore();
  useEffect(() => {
    if (!loggedIn && localStorage.getItem("loggedIn") !== "true")
      router.push("/admin/auth");
  }, [loggedIn]);

  return <div>Admin layout</div>;
}

export default AdminLayout;
