import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';
import SongTable from './SongTable';
import OpenDialogSong from './OpenDialogSong';
const SongContent = () => {
    return (_jsx("section", { children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: 'flex items-center justify-between', children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: 'flex items-center gap-2', children: [_jsx(Music, { className: 'text-primary size-6' }), "Song Library"] }), _jsx(CardDescription, { children: "Manage your music tracks" })] }), _jsx(OpenDialogSong, {})] }) }), _jsx(CardContent, { children: _jsx(SongTable, {}) })] }) }));
};
export default SongContent;
