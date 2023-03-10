import React, { useContext } from "react";
import AppContext from "../context";
import Sidebar from "./Sidebar";

function Header() {
  const { handleNewChat, setShowSidebar, showSidebar } = useContext(AppContext);

  return (
    <div className="flex justify-between pt-1 pb-1 h-[5%]">
      <Sidebar />
      {!showSidebar && <h1 className="text-3xl font-bold cursor-pointer">ConvoAI</h1>}
    </div>
  );
}

export default Header;
