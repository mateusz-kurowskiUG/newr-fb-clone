"use client";
import React from "react";
import AdminLayout from "./components/admin-layout";
import LoggedInGuard from "./components/logged-in-guard";
function Page() {
  return (
    <LoggedInGuard>
      <AdminLayout />;
    </LoggedInGuard>
  );
}

export default Page;
