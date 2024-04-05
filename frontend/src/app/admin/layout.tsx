"use client";
import React from "react";
import NavBar from "./components/admin-navbar";
import Footer from "./components/footer";
import ReactQueryAdminProvider from "./providers/react-query-admin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ReactQueryAdminProvider>
        <NavBar />
        {children}
        <ReactQueryDevtools />
        <Footer />
      </ReactQueryAdminProvider>
    </div>
  );
}

export default layout;
