import React, { useContext, useEffect } from "react";
import AppContext from "../context";

function Convo() {
  const { chatLog, messages, setChatLog } = useContext(AppContext);
  //check if there is an api key in local storage and set the chat log accordingly
  const apiInputLocal = localStorage.getItem("apiInput");
  useEffect(() => {
    if (apiInputLocal) {
      setChatLog([
        //welcoming log
        {
          role: "assistant",
          content: "Welcome! How may I help you today?",
        },
        {
          role: "user",
          content: null,
        },
      ]);
    } else {
      setChatLog([
        {
          role: "assistant",
          content:
            "Welcome! Please enter your API key in the Menu to start chatting.",
        },
        {
          role: "user",
          content: null,
        },
      ]);
    }
  }, [apiInputLocal]);

  return (
    <>
      {chatLog.map((log, i) => {
        if (log.role === "assistant" && log.content) {
          return (
            <div key={i} className="flex">
              <div className="text-white bg-gray-500 md:max-w-xl p-2 rounded-lg mt-10 text-left max-w-max scroll-snap-align-end">
                {log.content}
              </div>
              <div className="flex flex-1"></div>
            </div>
          );
        } else if (log.role === "user" && log.content) {
          return (
            <div key={i} className="flex">
              <div className="flex flex-1"></div>
              <div className="text-white bg-teal-500 p-2 rounded-lg mt-10 text-right max-w-max scroll-snap-align-end">
                {log.content}
              </div>
            </div>
          );
        }
      })}

      {messages.map((message, i) => {
        if (message.role === "assistant" && message.content !== null) {
          return (
            <div key={i} className="flex">
              <div className="text-white bg-gray-500 md:max-w-xl p-2 rounded-lg mt-10 text-left max-w-max scroll-snap-align-end">
                {message.content}
              </div>
              <div className="flex flex-1"></div>
            </div>
          );
        } else if (message.role === "user" && message.content !== null) {
          return (
            <div key={i} className="flex">
              <div className="flex flex-1"></div>
              <div className="text-white bg-teal-500 p-2 rounded-lg mt-10 text-right max-w-max scroll-snap-align-end">
                {message.content}
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export default Convo;
