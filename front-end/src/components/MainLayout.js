import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "./ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/pages/sidebar/LeftSidebar";
import FriendsPage from "@/pages/friends-activity/FriendsPage";
import AudioPlayer from "./home/AudioPlayer";
import PlayerControls from "./PlayerControls";
const MainLayout = () => {
    const isMobile = false;
    return (_jsxs("div", { className: "h-screen flex flex-col", children: [_jsx(AudioPlayer, {}), _jsxs(ResizablePanelGroup, { orientation: "horizontal", className: "flex flex-1 overflow-hidden h-full p-4", children: [_jsx(ResizablePanel, { defaultSize: "20%", minSize: isMobile ? "0%" : "10%", children: _jsx(LeftSidebar, {}) }), _jsx(ResizableHandle, { withHandle: true }), _jsx(ResizablePanel, { defaultSize: isMobile ? "80%" : "60%", minSize: "60%", children: _jsx(Outlet, {}) }), _jsx(ResizableHandle, { withHandle: true }), _jsx(ResizablePanel, { defaultSize: "20%", minSize: "0", maxSize: "25%", collapsedSize: "0%", children: _jsx(FriendsPage, {}) })] }), _jsx(PlayerControls, {})] }));
};
export default MainLayout;
