import React, { useState } from "react";

const ChatArea = () => {
  const [messages, setMessages] = useState([
    { form: "bot", text: "Hello ! How can I help you ?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setMessages([...messages, { form: "user", text: inputValue }]);
    setInputValue("");
  };
 
  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow p-4">
      {/* header */}
      <div className="border-b pb-3 mb-3">
        <h2 className="text-lg font-semibold text-gray-700">Chat with Neha</h2>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.form === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                message.form === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* input area */}
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
    </div>
  );
};

export default ChatArea;
