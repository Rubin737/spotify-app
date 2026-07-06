import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("div", { className: "bg-background", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/sso-callback", element: _jsx(AuthenticateWithRedirectCallback, { signInForceRedirectUrl: "/auth-callback", signUpForceRedirectUrl: "/auth-callback" }) }), _jsx(Route, { path: "/auth-callback", element: _jsx(AuthCallback, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminPage, {}) }), _jsxs(Route, { element: _jsx(MainLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/chat", element: _jsx(ChatPage, {}) }), _jsx(Route, { path: "/album/:albumId", element: _jsx(AlbumPage, {}) }), _jsx(Route, { path: "*", element: _jsx(ErrorPage, {}) })] })] }) }));
};
export default App;
