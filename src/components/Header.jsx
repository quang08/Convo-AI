import React, { useContext } from "react";
import AppContext from "../context";
import Sidebar from "./Sidebar";

function Header() {
  const { showSidebar } = useContext(AppContext);

  return (
    <div className="flex justify-between items-center p-5 h-[8%] border-b border-neutral-800 w-full">
      <Sidebar />
      {!showSidebar && <h1 className="text-4xl font-bold cursor-pointer">ConvoAI</h1>}
    </div>
  );
}

export default Header;
