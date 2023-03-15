import React, { useContext, useEffect } from "react";
import AppContext from "../utils/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { FcCommandLine } from "react-icons/fc";

function Convo() {
  const { chatLog, messages, setChatLog } = useContext(AppContext);
  const [user, loading] = useAuthState(auth);

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
            <div key={i} className="flex justify-start items-end">
              <FcCommandLine className="w-8 h-8 rounded-full mb-1 mr-2" />
              <div className="dark:text-white text-black dark:bg-gray-500 bg-gray-300 md:max-w-xl p-2 rounded-lg mt-10 text-left max-w-max">
                {log.content}
              </div>
            </div>
          );
        } else if (log.role === "user" && log.content) {
          return (
            <div key={i} className="flex justify-end">
              <div className="dark:text-white text-black bg-teal-500 p-2 rounded-lg mt-10 text-right max-w-max">
                {log.content}
              </div>
            </div>
          );
        }
      })}

      {messages.map((message, i) => {
        if (message.role === "assistant" && message.content !== null) {
          return (
            <div key={i} className="flex justify-start items-end">
              <FcCommandLine className="w-8 h-8 rounded-full mb-1 mr-2" />
              <div className="dark:text-white text-black dark:bg-gray-500 bg-gray-300 md:max-w-xl p-2 rounded-lg mt-10 text-left max-w-max">
                {message.content}
              </div>
            </div>
          );
        } else if (message.role === "user" && message.content !== null) {
          return (
            <div key={i} className="flex justify-end items-end">
              <div className="dark:text-white text-black bg-teal-500 p-2 rounded-lg mt-10 text-right max-w-max">
                {message.content}
              </div>
              {user && (
                <img
                  className="w-8 h-8 rounded-full mb-1 ml-2"
                  src={user?.photoURL}
                />
              )}
            </div>
          );
        }
      })}
    </>
  );
}

export default Convo;
