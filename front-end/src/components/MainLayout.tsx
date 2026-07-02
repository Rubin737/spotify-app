import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/pages/sidebar/LeftSidebar";
import FriendsPage from "@/pages/friends-activity/FriendsPage";
import AudioPlayer from "./home/AudioPlayer";
import PlayerControls from "./PlayerControls";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen flex flex-col">
      <AudioPlayer/>
      <ResizablePanelGroup
        orientation="horizontal"
        className="flex flex-1 overflow-hidden h-full p-4"
      >
        <ResizablePanel defaultSize="20%" minSize={isMobile ? "0%" : "10%"}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={isMobile ? "80%" : "60%"} minSize="60%">
          <Outlet />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize="20%"
          minSize="0"
          maxSize="25%"
          collapsedSize="0%"
        >
         <FriendsPage/>
        </ResizablePanel>
      </ResizablePanelGroup>
      <PlayerControls/>
    </div> 
  );
};

export default MainLayout;
