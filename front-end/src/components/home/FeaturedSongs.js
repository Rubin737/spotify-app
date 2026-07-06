import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FeaturedSkeleton from '@/skeletons/featuredSkeleton';
import PlaySongButton from './PlaySongButton';
const FeaturedSongs = ({ error, isLoading, songs, title }) => {
    if (isLoading)
        _jsx(FeaturedSkeleton, {});
    if (error)
        _jsx("p", { children: "Error" });
    return (_jsxs("section", { children: [_jsx("h1", { className: 'text-3xl font-bold my-5', children: title }), _jsx("div", { className: 'grid grid-cols-3 gap-3', children: songs?.map(song => (_jsxs("div", { className: 'flex relative group gap-2 items-center bg-zinc-800 rounded-md', children: [_jsx("div", { children: _jsx("img", { className: 'size-18 rounded-l-md overflow-hidden object-cover', src: song.imageUrl, alt: "song-cover" }) }), _jsxs("div", { children: [_jsx("p", { className: 'font-bold text-sm', children: song.title }), _jsx("p", { className: 'text-[11px] font-bold text-secondary', children: song.artist })] }), _jsx("div", { className: 'absolute right-3 bottom-3', children: _jsx(PlaySongButton, { song: song }) })] }, song._id))) })] }));
};
export default FeaturedSongs;
