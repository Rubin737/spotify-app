import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StatCard = ({ bgColor, icon: Icon, label, value, iconColor, }) => {
    return (_jsx("div", { className: "p-8 bg-zinc-800 rounded-xl transition-colors hover:bg-zinc-800/50", children: _jsxs("div", { className: "items-center flex gap-3", children: [_jsx("div", { className: `${bgColor} rounded-md p-3 hover:${bgColor}/50 hover:scale-103`, children: _jsx(Icon, { className: `${iconColor} size-6 ` }) }), _jsxs("div", { className: "font-bold", children: [_jsx("p", { className: "font-xl", children: label }), _jsx("p", { className: "font-lg text-white", children: value })] })] }) }));
};
export default StatCard;
