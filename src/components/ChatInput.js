import React, { useState } from "react";
import styled from "styled-components";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const ChatInput = ({ channelName, channelId }) => {
  const user = useSelector((state) => state.user.user);
  const [chatMessage, setChatMessage] = useState("");
  const channelMessageRef = collection(db, "rooms", `${channelId}`, "messages");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }
    await addDoc(channelMessageRef, {
      message: chatMessage,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
    setChatMessage("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          type="text"
          placeholder={`Message ${channelName ? channelName : ""}`}
        />
        <button type="submit" onClick={(e) => sendMessage(e)} hidden>
          Send
        </button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border-radius: 3px;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
