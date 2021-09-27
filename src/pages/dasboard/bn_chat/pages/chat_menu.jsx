import React from "react";
import SideBarHeader from "../components/chat_header/side_bar_header";
import Chats from "../components/sidebar";

export default function ChatMenu() {
  return (
    <>
      {" "}
      <SideBarHeader />
      <Chats />
    </>
  );
}
