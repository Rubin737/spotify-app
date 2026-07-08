import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AuthCallback from "./pages/AuthCallback";
import "./App.css";
import { AuthenticateWithRedirectCallback } from "@clerk/react";
import MainLayout from "./components/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import ChatPage from "./pages/chat/ChatPage";
import ErrorPage from "./pages/404/ErrorPage";
import MobileFooter from "./components/mobile/MobileFooter";
import { useEffect, useState } from "react";
import FriendsPage from "./pages/friends-activity/FriendsPage";
import LeftSidebar from "./pages/sidebar/LeftSidebar";
const App = () => {

  const [isMobile,setIsMobile]=useState(window.innerWidth<768)
    useEffect(()=>{
     const handleResize=()=>setIsMobile(window.innerWidth<768)
      window.addEventListener("resize",handleResize)
      return()=>{
        window.removeEventListener("resize",handleResize)
      }
    },[])
  return (
    <div className="bg-background">
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          {
            isMobile && <>
             <Route path="/activity" element={<FriendsPage />} />
             <Route path="/album" element={<LeftSidebar />} />
             
            </>
          }
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      {
        isMobile && <MobileFooter/>
      }
    </div>
  );
};

export default App;
