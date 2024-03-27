import React from "react";
import { ModeToggle } from "../../components/mode-toggle";

function AdminNavBar() {
  return (
    <header className="flex items-center justify-between p-2 bg-primary">
      <div className="logo">logo</div>
      <ModeToggle />
    </header>
  );
}

export default AdminNavBar;
