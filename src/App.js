import React from "react";
import Chat from "./components/Chat";
import Header from "./components/Header";
import { AppContextProvider } from "./context";

function App() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col justify-center items-center text-white">
      <AppContextProvider>
        <Header />
        <Chat />
      </AppContextProvider>
    </div>
  );
}

export default App;
