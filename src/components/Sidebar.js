import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import CreateIcon from "@mui/icons-material/Create";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { onSnapshot, collection, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [channelList, setChannelList] = useState([]);
  const user = useSelector((state) => state.user.user);
  const channelCollectionRef = collection(db, "rooms");

  useEffect(() => {
    const q = query(channelCollectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setChannelList(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      );
    });

    return unsub;
  }, []);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <SidebarInfoTop>
            <h2>Ujjwal's Room</h2>
            <ExpandMoreIcon />
          </SidebarInfoTop>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOption Icon={InsertCommentIcon} title="Threads" font="small" />
      <SidebarOption
        Icon={InboxIcon}
        title="Mentions & reactions"
        font="small"
      />
      <SidebarOption Icon={DraftsIcon} title="Saved items" font="small" />
      <SidebarOption
        Icon={BookmarkBorderIcon}
        title="Channel browser"
        font="small"
      />
      <SidebarOption
        Icon={PeopleAltIcon}
        title="People & user groups"
        font="small"
      />
      <SidebarOption Icon={AppsIcon} title="Apps" font="small" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" font="small" />
      <SidebarOption Icon={ArrowDropUpIcon} title="Show less" font="medium" />
      <hr />
      <SidebarOption Icon={ArrowDropDownIcon} title="Channels" font="medium" />
      <hr />
      <SidebarOption
        Icon={AddIcon}
        addChannelOption
        title="Add Channel"
        font="small"
      />

      {channelList.map((channel) => (
        <SidebarOption
          key={channel.id}
          id={channel.id}
          title={channel.data.name}
          isChannel
        />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h3 {
    font-size: 13px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    color: green;
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
  }
`;

const SidebarInfoTop = styled.div`
  display: flex;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > .MuiSvgIcon-root {
    font-size: 19px;
    margin-top: 2px;
    cursor: pointer;
    margin-left: 7px;
  }
`;
