import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
    const navigate = useNavigate();
    return (_jsx("div", { className: 'h-screen bg-neutral-900 flex items-center justify-center', children: _jsxs("div", { className: 'text-center space-y-8 px-4', children: [_jsx("div", { className: 'flex justify-center animate-bounce', children: _jsx(Music2, { className: 'h-24 w-24 text-emerald-500' }) }), _jsxs("div", { className: 'space-y-4', children: [_jsx("h1", { className: 'text-7xl font-bold text-white', children: "404" }), _jsx("h2", { className: 'text-2xl font-semibold text-white', children: "Page not found" }), _jsx("p", { className: 'text-neutral-400 max-w-md mx-auto', children: "Looks like this track got lost in the shuffle. Let's get you back to the music." })] }), _jsxs("div", { className: 'flex flex-col sm:flex-row gap-4 justify-center items-center mt-8', children: [_jsx(Button, { onClick: () => navigate(-1), variant: 'outline', className: 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 w-full sm:w-auto', children: "Go Back" }), _jsxs(Button, { onClick: () => navigate("/"), className: 'bg-emerald-500 hover:bg-emerald-600 text-white w-full sm:w-auto', children: [_jsx(Home, { className: 'mr-2 h-4 w-4' }), "Back to Home"] })] })] }) }));
};
export default ErrorPage;
