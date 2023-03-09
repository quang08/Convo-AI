import React, { useEffect, useRef, useContext } from "react";
import AppContext from "../context";
import Header from "./Header";
import Convo from "./Convo";
import Loading from "./Loading";
import Input from "./Input";

function Chat() {
  const {
    handleNewChat,
    handleQuery,
    chatLog,
    messages,
    typing,
    input,
    setInput,
  } = useContext(AppContext);

  //to snap to the latest message
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-between gap-2">
      <Header />

      <div className="flex-1 overflow-y-scroll">
        <Convo />

        <div ref={messagesEndRef} />

        {typing && <Loading />}
      </div>

      <div className="flex justify-between mx-auto w-full mt-5 lg:max-w-3xl">
        <Input />
      </div>

    </div>
  );
}

export default Chat;
