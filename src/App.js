import React, { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Header from "./components/Header";
import { AppContextProvider } from "./utils/context";

function App() {
  return (
    <div className="h-screen w-screen bg-slate-50 dark:bg-black flex flex-col justify-center items-center dark:text-white ">
      <AppContextProvider>
        <Header />
        <Chat />
      </AppContextProvider>
    </div>
  );
}

export default App;
