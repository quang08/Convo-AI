import React, { useContext } from "react";
import AppContext from "../context";

function Header() {
  const { handleNewChat } = useContext(AppContext);

  return (
    <div className="flex justify-between pt-1 pb-1">
      <h1 className="text-3xl font-bold">ChatGPT</h1>
      <button
        onClick={() => handleNewChat()}
        className="text-white bg-teal-500 p-2 rounded-lg transition duration-300 hover:bg-teal-400 hover:ring-2 ring-white"
      >
        New Chat
      </button>
    </div>
  );
}

export default Header;
