import React, { useContext } from "react";
import AppContext from "../context";
import Sidebar from "./Sidebar";
import Switcher from "./Switcher";

function Header() {
  const { showSidebar } = useContext(AppContext);

  return (
    <div className="flex justify-between items-center p-5 h-[8%] dark:border-b dark:border-neutral-800 w-full shadow-md">
      <Sidebar />
      {!showSidebar && (
        <>
          <h1 className="text-4xl font-bold cursor-pointer dark:text-white text-black">
            ConvoAI
          </h1>
          <Switcher />
        </>
      )}
    </div>
  );
}

export default Header;
