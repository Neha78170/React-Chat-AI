import React, { useEffect, useRef, useState } from "react";

const ChatArea = ({selectedUser}) => {
  const [messages, setMessages] = useState([
    {
      form: "bot",
      text: "Hello! How can I help you?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.form === "user") {
      const timeout = setTimeout(() => {
        let reply = "I'm here to help!";
        const userText = lastMessage.text.toLowerCase();

        if (userText.includes("hi") || userText.includes("hello")) {
          reply = "Hello! Nice to meet you!";
        } else if (userText.includes("thanks") || userText.includes("thank")) {
          reply = "You're welcome!";
        }

        setMessages((prev) => [
          ...prev,
          {
            form: "bot",
            text: "Typing...",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);

        const typingTimeout = setTimeout(() => {
          setMessages((prev) => [
            ...prev.slice(0, -1),
            {
              form: "bot",
              text: reply,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }, 1000);

        return () => clearTimeout(typingTimeout);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      {
        form: "user",
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInputValue("");
  };

  const handleEmojiClick = (emoji) => {
    setMessages((prev) => [
      ...prev,
      {
        form: "user",
        text: emoji,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow p-4">
      {/* Header */}
      <div className="border-b pb-3 mb-3">
        <h2 className="text-lg font-semibold text-gray-700">Chat with Neha</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col max-w-xs">
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.form === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {message.text}
              </div>
              <span className="text-xs text-gray-500 mt-1 text-right">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </form>

      {/* Emoji Reactions */}
      <div className="mt-2 flex gap-2">
        {["😊", "😂", "👍", "❤️", "🎉"].map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => handleEmojiClick(emoji)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
