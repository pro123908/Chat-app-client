import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <h1>Welcome to the Chat App</h1>

      <div>
        <label>Name </label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          onChange={({ target: { value } }) => setName(value)}
        />
      </div>

      <div>
        <label>Room </label>
        <input
          type="text"
          name="room"
          autoComplete="off"
          onChange={({ target: { value } }) => setRoom(value)}
        />
      </div>

      <Link
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        to={`/chatTemplate?name=${name}&room=${room}`}
      >
        <button>Join</button>
      </Link>
    </div>
  );
};

export default Join;
