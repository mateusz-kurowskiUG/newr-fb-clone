import React from "react";
import NavBar from "./components/admin-navbar";
import Footer from "./components/footer";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
