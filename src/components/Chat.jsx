import React, { useEffect, useRef, useContext } from "react";
import AppContext from "../context";
import Header from "./Header";
import Convo from "./Convo";
import Loading from "./Loading";
import Input from "./Input";
import Modal from "./Modal";

function Chat() {
  const { messages, typing, showModal } = useContext(AppContext);

  //to snap to the latest message
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-between z-10">
      <div className="overflow-y-scroll max-h-[510px] sm:max-h-[690px] xsm:max-h-[720px] md:max-h-[75vh] lg:max-h-[78vh]">
        <Convo />

        <div ref={messagesEndRef} />

        {typing && <Loading />}
      </div>

      <div className="flex justify-between mx-auto w-full mt-5 lg:max-w-3xl">
        <Input />
      </div>

      {showModal && <Modal />}
    </div>
  );
}

export default Chat;
