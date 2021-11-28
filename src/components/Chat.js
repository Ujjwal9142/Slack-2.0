import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import Message from "./Message";
import { collection, orderBy, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

const Chat = () => {
  const [roomMessages, setRoomMessages] = useState([]);
  const chatRef = useRef(null);

  const channelId = useSelector((state) => state.channel.roomId);
  const channelName = useSelector((state) => state.channel.roomName);
  const channelMessageRef = collection(db, "rooms", `${channelId}`, "messages");

  useEffect(() => {
    if (channelId) {
      const q = query(channelMessageRef, orderBy("timestamp", "asc"));
      const unsub = onSnapshot(q, (snapshot) => {
        setRoomMessages(
          snapshot.docs.map((doc) => {
            return {
              data: doc.data(),
              id: doc.id,
            };
          })
        );
      });
      return unsub;
    }
  }, [channelId]);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomMessages]);

  return (
    <ChatContainer>
      {roomMessages && channelId ? (
        <>
          <ChatHeader>
            <ChatHeaderLeft>
              <h4>
                <strong>{`# ${channelName ? channelName : "ROOM"}`}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </ChatHeaderLeft>

            <ChatHeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </ChatHeaderRight>
          </ChatHeader>

          <ChatMessages>
            {roomMessages.map((roomMessage) => (
              <Message
                key={roomMessage.id}
                message={roomMessage.data.message}
                timestamp={roomMessage.data.timestamp}
                userName={roomMessage.data.user}
                userImage={roomMessage.data.userImage}
              />
            ))}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput channelName={channelName} channelId={channelId} />
        </>
      ) : (
        <InstructionContainer>
          <h1>Instruction Page</h1>
          <Instructions>
            <h4>1) To return at this Instruction Page refresh the Webpage.</h4>
            <h4>2) Click on "Add Channel" to add More Channels.</h4>
            <h4>
              3) Click on a channel to select it and check messages on it.
            </h4>
            <h4>
              4) After selecting a channel type something in the text field at
              bottom and hit enter to send messages to a channel.
            </h4>
            <h4>5) Click on "Profile Picture" to LOGOUT of the App.</h4>
          </Instructions>
        </InstructionContainer>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatMessages = styled.div``;

const Instructions = styled.div`
  margin-top: 50px;
  margin-left: 50px;

  > h4 {
    padding: 10px 0px;
    font-size: 18px;
    font-weight: 700;
  }
`;

const InstructionContainer = styled.div`
  > h1 {
    text-align: center;
    margin-top: 15px;
    color: black;
    font-weight: 600;
  }
`;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
  }

  > .MuiSvgIcon-root {
    font-size: 18px;
    margin-left: 10px;
    margin-top: 1px;
  }
`;

const ChatHeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    font-size: 16px;
    margin-right: 5px !important;
  }
`;
