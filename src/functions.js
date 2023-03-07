export function handleQuery(
  setTyping,
  setMessages,
  setInput,
  messages,
  input,
  apiKey
) {
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

  fetch(`https://api.openai.com/v1/chat/completions`, {
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
}

export function handleNewChat({ setMessages, setChatLog }) {
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
}

// const handleQuery = async () => {
//   setTyping(true);
//   let messagesNew = [...messages, { role: "user", content: input }];
//   setMessages(messagesNew);
//   setInput("");

//   // to remember the context as the API requires sending in the previous messages with this syntax of role and content
//   messages &&
//     setMessages([
//       ...messages,
//       {
//         role: "user",
//         content: input,
//       },
//     ]);

//   await fetch(`https://api.openai.com/v1/chat/completions`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: `gpt-3.5-turbo`,
//       messages: [...messages, { role: "user", content: input }], //sending in the previous messages and the new message
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       setMessages([
//         ...messagesNew,
//         { role: "assistant", content: data.choices[0].message.content },
//       ]);
//     })
//     .then(() => {
//       setTyping(false);
//     });
// };

// const handleNewChat = () => {
//   setMessages([
//     {
//       role: "assistant",
//       content: null,
//     },
//     {
//       role: "user",
//       content: null,
//     },
//   ]);

//   setChatLog([
//     {
//       role: "assistant",
//       content: null,
//     },
//     {
//       role: "user",
//       content: null,
//     },
//   ]);
// };
