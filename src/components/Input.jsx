import React, { useContext } from "react";
import AppContext from "../context";

function Input() {
  const { handleQuery, input, setInput } = useContext(AppContext);
  return (
    <>
      <input
        className="rounded-lg text-black p-1 flex-1 bg-gray-300 focus:outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") handleQuery();
        }}
      />
      <button
        onClick={() => handleQuery()}
        className="ml-3 p-1 w-20 text-sm bg-teal-500 rounded-lg transition duration-300 hover:bg-teal-400"
      >
        Submit
      </button>
    </>
  );
}

export default Input;
