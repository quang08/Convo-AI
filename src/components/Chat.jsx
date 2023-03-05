import React, { useState, useEffect } from "react";


function Chat() {
  const apiKey = "";
  console.log(apiKey);
  const [input, setInput] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [typing, setTyping] = useState(false);
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "Welcome! How may I help you today ?",
    },
    {
      user: "me",
      message: null,
    },
  ]);


  const handleQuery = () => {
    setTyping(true);
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setChatLog(chatLogNew);
    setInput("");

    fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: `gpt-3.5-turbo`,
        messages: [{ role: "user", content: input }],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChatLog([
          ...chatLogNew,
          { user: "gpt", message: `${data.choices[0].message.content}` },
        ]);
      })
      .then(() => {
        setTyping(false);
      });
  };

  const handleNewChat = () => {
    setChatLog([
      {
        user: "gpt",
        message: null,
      },
      {
        user: "me",
        message: null,
      },
    ]);
  };

  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-between">
      <div className="flex justify-between pt-1 pb-1">
        <h1 className="text-3xl font-bold">ChatGPT</h1>
        <button
          onClick={handleNewChat}
          className="text-white bg-teal-500 p-2 rounded-lg transition duration-300 hover:bg-teal-400 hover:ring-2 ring-white"
        >
          New Chat
        </button>
      </div>

      <div className="h-[650px] overflow-y-scroll scroll-snap-type-y-mandatory">
        {chatLog.map((log, i) => {
          if (log.user === "gpt" && log.message) {
            return (
              <div key={i} className="flex">
                <div className="text-white bg-gray-500 md:max-w-xl p-2 rounded-lg mt-10 text-left max-w-max scroll-snap-align-end">
                  {log.message}
                </div>
                <div className="flex flex-1"></div>
              </div>
            );
          } else if (log.user === "me" && log.message) {
            return (
              <div key={i} className="flex">
                <div className="flex flex-1"></div>
                <div className="text-white bg-teal-500 p-2 rounded-lg mt-10 text-right max-w-max scroll-snap-align-end">
                  {log.message}
                </div>
              </div>
            );
          }
        })}
        {typing && (
          <div className="text-white bg-gray-500 p-3 rounded-lg mt-10 flex max-w-max">
            <div className="w-1 h-1 rounded-full bg-gray-200 mr-1 animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-gray-200 mr-1 animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-gray-200 mr-1 animate-pulse"></div>
          </div>
        )}
      </div>

      <div className="flex justify-between mx-auto w-full mt-5 lg:max-w-3xl">
        <input
          className="rounded-lg text-black p-1 flex-1 bg-gray-300 focus:outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button
          onClick={handleQuery}
          className="ml-3 p-1 w-20 text-sm bg-teal-500 rounded-lg transition duration-300 hover:bg-teal-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Chat;
