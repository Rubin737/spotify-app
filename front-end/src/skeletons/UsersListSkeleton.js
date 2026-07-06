import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const UsersListSkeleton = () => {
    return Array.from({ length: 4 }).map((_, i) => (_jsxs("div", { className: 'flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg animate-pulse', children: [_jsx("div", { className: 'h-12 w-12 rounded-full bg-zinc-800' }), _jsxs("div", { className: 'flex-1 lg:block hidden', children: [_jsx("div", { className: 'h-4 w-24 bg-zinc-800 rounded mb-2' }), _jsx("div", { className: 'h-3 w-32 bg-zinc-800 rounded' })] })] }, i)));
};
export default UsersListSkeleton;
