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
const App = () => {
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
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
