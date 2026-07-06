import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserButton } from "@clerk/react";
import { Link } from "react-router-dom";
const AdminHeader = () => {
    return (_jsxs("header", { className: "flex justify-between bg-zinc-800 p-3 rounded-xl", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { to: "/", children: _jsx("img", { src: "/spotify.png", alt: "spotify-img", className: "size-9" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-bold", children: "Music Manager" }), _jsx("p", { className: "text-md text-gray-300", children: "Manage your music catalog" })] })] }), _jsx("div", { className: "rounded-full", children: _jsx(UserButton, {}) })] }));
};
export default AdminHeader;
