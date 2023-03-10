import { React, useState, useContext } from "react";
import AppContext from "../context";
import Socials from "./Socials";

function Sidebar() {
  const { setShowSidebar, showSidebar, handleNewChat } = useContext(AppContext);

  return (
    <>
      {!showSidebar && (
        <button
          className="space-y-2 p-1 w-12 flex flex-col justify-center items-center rounded-lg cursor-pointer transition duration-300  hover:ring-2 ring-teal-500"
          onClick={() => setShowSidebar(true)}
        >
          <div className="w-8 h-0.5 bg-white"></div>
          <div className="w-8 h-0.5 bg-white"></div>
          <div className="w-8 h-0.5 bg-white"></div>
        </button>
      )}

      <div
        className={`top-0 left-0 w-full md:max-w-[350px] bg-neutral-900 p-1 text-white fixed h-full md:h-[98%] z-40 ease-in-out md:mt-2 duration-500 md:rounded-xl ${
          showSidebar ? "translate-x-0 md:m-2" : "-translate-x-full"
        }`}
      >
        <div className="flex w-full justify-between p-2">
          <div className="text-3xl font-bold">ConvoAI</div>
          <button
            className="p-2 border-2 text-sm rounded-md border-gray-400 cursor-pointer transition duration-300 hover:border-teal-500 hover:ring-2"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            X
          </button>
        </div>

        <div className="flex flex-col p-2 mt-2 h-[80%]">
          <button
            onClick={() => handleNewChat()}
            className="text-white bg-teal-500 p-2 rounded-lg transition duration-300 hover:bg-teal-400 hover:ring-2 ring-white"
          >
            New Chat
          </button>
        </div>

        <Socials/>
      </div>
    </>
  );
}

export default Sidebar;



