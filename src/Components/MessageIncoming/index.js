import React from "react";
import image from "../../assets/images/bilal.jpg";

const MessageIncoming = ({ message }) => {
  return (
    <div className="chat-message message__incoming">
      <div className="chat-message__container-incoming">
        <img src={image} alt="" className="chat-message__image" />
        <div className="incoming__text chat-message__text">{message}</div>
        <div className="chat-message__time">12:57</div>
      </div>
    </div>
  );
};

export default MessageIncoming;
