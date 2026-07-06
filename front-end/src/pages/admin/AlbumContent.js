import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';
import OpenDialogAlbum from './OpenDialogAlbum';
import AlbumTable from './AlbumTable';
const AlbumContent = () => {
    return (_jsx("section", { children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: 'flex items-center justify-between', children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: 'flex items-center gap-2', children: [_jsx(Music, { className: 'text-primary size-6' }), "Album Library"] }), _jsx(CardDescription, { children: "Manage your album history" })] }), _jsx(OpenDialogAlbum, {})] }) }), _jsx(CardContent, { children: _jsx(AlbumTable, {}) })] }) }));
};
export default AlbumContent;
