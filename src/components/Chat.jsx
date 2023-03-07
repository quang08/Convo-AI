import React, { useState, useEffect, useRef } from "react";

function Chat() {
  const apiKey = "";
  const [input, setInput] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]); //to store the conversation history to send as a parameter to the API and to render the convo
  const [chatLog, setChatLog] = useState([
    //welcoming log
    {
      role: "assistant",
      content: "Welcome! How may I help you today ?",
    },
    {
      role: "user",
      content: null,
    },
  ]);

  //to snap to the latest message
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuery = async () => {
    setTyping(true);
    let messagesNew = [...messages, { role: "user", content: input }];
    setMessages(messagesNew);
    setInput("");

    // to remember the context as the API requires sending in the previous messages with this syntax of role and content
    messages &&
      setMessages([
        ...messages,
        {
          role: "user",
          content: input,
        },
      ]);

    await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: `gpt-3.5-turbo`,
        messages: [...messages, { role: "user", content: input }], //sending in the previous messages and the new message
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([
          ...messagesNew,
          { role: "assistant", content: data.choices[0].message.content },
        ]);
      })
      .then(() => {
        setTyping(false);
      });
  };

  const handleNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: null,
      },
      {
        role: "user",
        content: null,
      },
    ]);

    setChatLog([
      {
        role: "assistant",
        content: null,
      },
      {
        role: "user",
        content: null,
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
        <div ref={messagesEndRef} />
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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleQuery();
          }}
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
