import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className=" flex flex-col box-border min-w-min min-h-fit">
      <Header />
      <Outlet />
      {/* footer */}
    </div>
  );
}
