import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./ChatCanvas.module.css";

function ChatCanvas() {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [msg, setMsg] = useState("");
  const { sendMessage, messages } = useSocket();

  function handleSend() {
    if (!msg) return;

    sendMessage(msg);
    setMsg("");
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={classes["wrapper"]}>
      <h2 className={classes["title"]}>Chat messages list</h2>

      <div className={classes["messages"]} ref={messageContainerRef}>
        {messages.map((message: string, i: React.Key) => (
          <p key={i} className={classes["messages__single"]}>
            {message}
          </p>
        ))}
      </div>

      <div className={classes["footer"]}>
        <input
          className={classes["input"]}
          type="text"
          placeholder="Type message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={classes["button"]} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatCanvas;
