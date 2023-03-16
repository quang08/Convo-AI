import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [input, setInput] = useState("");
  const [apiInput, setApiInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(() => { //if there's saved messages then set it as the inital state, else empty
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const [user, setUser] = useState({});
  const [chatLog, setChatLog] = useState(() => {
    const apiInput = localStorage.getItem("apiInput");
    if (apiInput) {
      return [
        {
          role: "assistant",
          content: "Welcome! How may I help you today?",
        },
        {
          role: "user",
          content: null,
        },
      ];
    } else {
      return [
        //welcoming log
        {
          role: "assistant",
          content:
            "Welcome! Please enter your API key in the Menu to start chatting.",
        },
        {
          role: "user",
          content: null,
        },
      ];
    }
  });

  //to store and update the messages into localStorage between renders
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);


  useEffect(() => {
    // retrieve saved messages from localStorage
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log("User: ", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
        Authorization: `Bearer ${localStorage.getItem("apiInput")}`,
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
        //save messages into localStorage
        localStorage.setItem("messages", JSON.stringify(messages));
      })
      .then(() => {
        setTyping(false);
      })
  };

  const handleNewChat = () => {
    setMessages([]);
    setShowSidebar(false);
    localStorage.removeItem("apiInput"); //this is causing a problem as it's clearing the theme
    localStorage.removeItem("messages");
    setApiInput("");
  };

  const handleModal = () => {
    setShowModal(true);
    setShowSidebar(false);
  };

  const handleAPI = (e) => {
    ///store apiInput into localStorage
    localStorage.setItem("apiInput", apiInput);
    setShowModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        handleNewChat,
        handleQuery,
        chatLog,
        setChatLog,
        messages,
        setMessages,
        typing,
        input,
        setInput,
        showSidebar,
        setShowSidebar,
        showModal,
        setShowModal,
        handleModal,
        isOpened,
        setIsOpened,
        apiInput,
        setApiInput,
        handleAPI,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
