import React from "react";
import { ModeToggle } from "../../components/mode-toggle";
import useLoginStore from "../stores/login-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import adminAxios from "../axios/admin-axios";

function AdminNavBar() {
  const { loggedIn, setLoggedIn } = useLoginStore();

  const handleLogout = () => {
    adminAxios
      .post("/logout")
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem("loggedIn");
      })
      .catch(() => {
        console.log("coulnt logout");
      });
  };
  return (
    <header className="flex items-center justify-between p-2 bg-primary">
      <div className="logo">
        <Link href="/admin">logo</Link>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {loggedIn ? (
          <Button onClick={handleLogout} className="bg-info">
            Logout
          </Button>
        ) : null}
      </div>
    </header>
  );
}

export default AdminNavBar;
