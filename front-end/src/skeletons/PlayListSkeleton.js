import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PlayListSkeleton = () => {
    return Array.from({ length: 10 }).map((_, i) => (_jsxs("div", { className: 'p-2 rounded-md flex items-center gap-3', children: [_jsx("div", { className: 'w-12 h-12 shrink-0 rounded-md bg-zinc-800 animate-pulse' }), _jsxs("div", { className: 'flex-1 min-w-0 space-y-2 shrink-0', children: [_jsx("div", { className: 'h-4 bg-zinc-800 rounded w-3/4 animate-pulse' }), _jsx("div", { className: 'h-4 bg-zinc-800 rounded w-1/2 animate-pulse' })] })] }, i)));
};
export default PlayListSkeleton;
