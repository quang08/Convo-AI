import React from "react";
import Chat from "./components/Chat";
import { AppContextProvider } from "./context";

function App() {
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center text-white">
      <AppContextProvider>
        <Chat />
      </AppContextProvider>
    </div>
  );
}

export default App;
