import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FeaturedSkeleton = () => {
    return (_jsx("div", { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8', children: Array.from({ length: 6 }).map((_, i) => (_jsxs("div", { className: 'flex items-center bg-zinc-800/50 rounded-md overflow-hidden animate-pulse', children: [_jsx("div", { className: 'w-16 sm:w-20 h-16 sm:h-20 bg-zinc-700 flex-shrink-0' }), _jsx("div", { className: 'flex-1 p-4', children: _jsx("div", { className: 'h-4 bg-zinc-700 rounded w-3/4 mb-2' }) })] }, i))) }));
};
export default FeaturedSkeleton;
