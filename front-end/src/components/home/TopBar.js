import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SignInOAuthButton from "@/helper/SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUser, UserButton } from "@clerk/react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const TopBar = () => {
    const { isSignedIn, isLoaded } = useUser();
    const { isAdmin } = useAuthStore();
    if (!isLoaded)
        return null;
    return (_jsxs("header", { className: "flex p-4 bg-zinc-800 rounded-md sticky z-10 backdrop-blur-md justify-between mx-3", children: [_jsx("div", { children: _jsx("img", { src: "/spotify.png", alt: "spotify-logo", className: "size-8" }) }), _jsxs("div", { className: "flex items-center gap-2", children: [isAdmin && (_jsx(Button, { asChild: true, className: "text-sm font-bold bg-zinc-700 border border-zinc-800", children: _jsxs(Link, { to: "/admin", className: "", children: [_jsx(LayoutDashboardIcon, { className: "size-5 text-green-500" }), "Admin Dashboard"] }) })), isSignedIn ? (_jsx(UserButton, {})) : (_jsx(SignInOAuthButton, {}))] })] }));
};
export default TopBar;
