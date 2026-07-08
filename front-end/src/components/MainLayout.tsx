import React, { useEffect, useState } from "react";
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
import MobileFooter from "./mobile/MobileFooter";

const MainLayout = () => {

  const [isMobile,setIsMobile]=useState(window.innerWidth<768)
  useEffect(()=>{
   const handleResize=()=>setIsMobile(window.innerWidth<768)
    window.addEventListener("resize",handleResize)
    return()=>{
      window.removeEventListener("resize",handleResize)
    }
  },[])

  
  return (
    <div className="h-screen flex flex-col">
      <AudioPlayer/>
      <ResizablePanelGroup
        orientation="horizontal"
        className="flex flex-1 overflow-hidden h-full lg:p-4 p-2"
      >
        <ResizablePanel defaultSize={isMobile?"0":"20%"} minSize={isMobile ? "0%" : "10%"}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={isMobile ? "80%" : "60%"} minSize="60%">
          <Outlet />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={isMobile?"0":"20%"}
          minSize="0"
          maxSize={isMobile?"0":"25%"}
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
