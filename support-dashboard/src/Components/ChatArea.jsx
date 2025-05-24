import React, { useEffect, useRef, useState } from "react";

const ChatArea = ({ selectedUser }) => {
  const [conversation, setConversation] = useState({});
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const currentMessages = conversation[selectedUser?.id] || [];

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateConversation = (newMessages) => {
    setConversation((prev) => ({
      ...prev,
      [selectedUser?.id]: newMessages,
    }));
  };

  // Handle message submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    updateConversation([
      ...currentMessages,
      {
        from: "user",
        text: inputValue,
        timestamp: getTime(),
      },
    ]);
    setInputValue("");
  };

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    updateConversation([
      ...currentMessages,
      {
        from: "user",
        text: emoji,
        timestamp: getTime(),
      },
    ]);
  };

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [currentMessages]);

  // Simulated bot reply
  useEffect(() => {
    const lastMessage = currentMessages[currentMessages.length - 1];
    if (lastMessage?.from === "user") {
      const replyTimeout = setTimeout(() => {
        const userText = lastMessage.text.toLowerCase();
        let reply = "I am here to help you!";
        // Add custom replies if needed here

        updateConversation([
          ...currentMessages,
          {
            from: "bot",
            text: reply,
            timestamp: getTime(),
          },
        ]);
      }, 1000);

      return () => clearTimeout(replyTimeout);
    }
  }, [currentMessages]);

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow p-4">
      {/* Header */}
      <div className="border-b pb-3 mb-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Chat with {selectedUser.name || "Neha"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {currentMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col max-w-xs">
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.from === "user"
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
