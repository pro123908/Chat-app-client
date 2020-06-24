import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

// The endpoint where socket.io server is running
const END_POINT = "https://chat-application-123908.herokuapp.com/";

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
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
  const sendMessage = (e) => {
    e.preventDefault();

    // Emitting message to the server
    socket.emit("sendMessage", message, () => setMessage(""));
  };

  return (
    <div>
      <div>
        {messages.map(({ user, text }) => (
          <div>{user + "=> " + text}</div>
        ))}
      </div>

      <div>
        <input
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
};

export default Chat;
