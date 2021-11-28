import React from "react";
import styled from "styled-components";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setChannelId, setChannelName } from "../features/actions";

const SidebarOption = ({
  Icon,
  title,
  addChannelOption,
  id,
  font,
  isChannel,
}) => {
  const channelCollectionRef = collection(db, "rooms");
  const dispatch = useDispatch();

  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      await addDoc(channelCollectionRef, {
        name: channelName,
        timestamp: serverTimestamp(),
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(setChannelId(id));
    }
    if (title) {
      dispatch(setChannelName(title));
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : isChannel && selectChannel}
    >
      {Icon && <Icon fontSize={font} style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  cursor: pointer;
  padding-left: 2px;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
