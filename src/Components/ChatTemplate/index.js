import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { v4 } from "uuid";

import ChatInput from "../ChatInput/ChatInput";
import MessageOutgoing from "../MessageOutgoing";
import MessageIncoming from "../MessageIncoming";

let socket;

// The endpoint where socket.io server is running
const END_POINT = "https://chat-application-123908.herokuapp.com/";

const ChatTemplate = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [messages, setMessages] = useState([]);

  // This useEffect will make connection to the socket.io server with the given endpoint,roomId and username
  useEffect(() => {
    console.log("Called 1st useEffect in chat.js");

    // Parsing the name and roomId from the url
    const { name, room } = queryString.parse(location.search);

    // Setting the name and roomId to the state
    setName(name);
    setRoom(room);

    // Connecting to the socket.io server
    socket = io(END_POINT);

    // Emitting the join message with the name and roomId
    socket.emit("join", { name, room }, ({ error }) => {
      // Incase there was any error from the server
      if (error) console.log("ERROR -> ", error);
    });

    // Cleanup Function
    return () => {
      // On un mounting of the component, clearing the socket connected
      socket.emit("disconnect");

      socket.off();
    };
  }, [END_POINT, location.search]);

  // This useEffect will attack socket listener for upcoming messages and add those messages to the messages list
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  // This method will send typed message to the server
  const sendMessage = (value) => {
    // Emitting message to the server
    socket.emit("sendMessage", value, () => {});
  };

  let chatMessagesContent = messages.map(({ user, text }) => {
    if (user === name) {
      return <MessageOutgoing message={text} key={v4()} />;
    }

    return <MessageIncoming message={text} key={v4()} />;
  });
  return (
    <div className="chat-app">
      <div className="chat-box__chat">
        <div className="chat">
          <div className="chat__header">
            <div className="header__user">
              <div className="header__info">
                <div className="user-name">Test</div>
                <div className="user-status">Active 3 mins ago</div>
              </div>
            </div>
          </div>

          <div className="chat__area">{chatMessagesContent}</div>

          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
