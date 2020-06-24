import React, { useState } from "react";

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const onEnterKeyPressed = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      setMessage("");
      sendMessage(message);
    }
  };

  return (
    <div className="chat__input-area">
      <textarea
        type="text"
        className="chat__input"
        placeholder="Type message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={onEnterKeyPressed}
      ></textarea>
    </div>
  );
};

export default ChatInput;
