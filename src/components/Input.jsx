import React, { useContext } from "react";
import AppContext from "../context";

function Input() {
  const { handleQuery, input, setInput, typing } = useContext(AppContext);
  const apiInputLocal = localStorage.getItem("apiInput");
  return (
    <>
      <input
        className="rounded-lg text-black p-2 flex-1 dark:bg-gray-300 bg-gray-200 focus:outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your message here..."
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter" && apiInputLocal) handleQuery();
        }}
      />
      <button
        onClick={() => handleQuery()}
        className="ml-3 p-1 w-20 text-sm dark:bg-teal-500 bg-teal-400 text-white rounded-lg transition duration-300 hover:bg-teal-400 disabled:bg-gray-500 dark:disabled:bg-gray-500"
        disabled={typing === true || apiInputLocal === null}
      >
        Submit
      </button>
    </>
  );
}

export default Input;
