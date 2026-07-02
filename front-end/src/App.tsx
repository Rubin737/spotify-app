import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AuthCallback from "./pages/AuthCallback";
import "./App.css";
import { AuthenticateWithRedirectCallback } from "@clerk/react";
import MainLayout from "./components/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import Testing from "./helper/Testing";
import AdminPage from "./pages/admin/AdminPage";
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
          <Route path="/test" element={<Testing />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
