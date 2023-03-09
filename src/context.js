import { createContext, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const apiKey = "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";
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
    <AppContext.Provider
      value={{
        handleNewChat,
        handleQuery,
        chatLog,
        messages,
        typing,
        input,
        setInput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
