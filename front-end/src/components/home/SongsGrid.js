import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FeaturedSkeleton from '@/skeletons/featuredSkeleton';
import PlaySongButton from './PlaySongButton';
const SongsGrid = ({ songs, error, isLoading, title }) => {
    if (isLoading)
        _jsx(FeaturedSkeleton, {});
    if (error)
        _jsx("p", { children: "Error" });
    return (_jsxs("section", { children: [_jsx("h1", { className: 'text-3xl my-5 font-bold', children: title }), _jsx("div", { className: 'grid grid-cols-5 gap-5', children: songs?.map(song => (_jsxs("div", { className: 'flex flex-col gap-2 group bg-zinc-800 w-fit p-4 rounded-md', children: [_jsxs("div", { className: 'relative', children: [_jsx("img", { src: song.imageUrl, className: 'w-full rounded-md', alt: "song-cover" }), _jsx("div", { className: 'absolute bottom-2 right-2', children: _jsx(PlaySongButton, { song: song }) })] }), _jsxs("div", { className: 'space-y-1.5', children: [_jsx("p", { className: 'text-sm font-bold', children: song.title }), _jsx("p", { className: 'text-[12px] font-medium text-gray-400', children: song.artist })] })] }, song._id))) })] }));
};
export default SongsGrid;
