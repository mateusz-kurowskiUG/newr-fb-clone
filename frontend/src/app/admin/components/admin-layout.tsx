"use client";
import { useRouter } from "next/navigation";
import React from "react";
import useLoginStore from "../stores/login-store";

function AdminLayout() {
  const router = useRouter();
  const { loggedIn } = useLoginStore();

  if (!loggedIn) router.push("/admin/auth");

  return <div>Admin layout</div>;
}

export default AdminLayout;
