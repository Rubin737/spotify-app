import { jsx as _jsx } from "react/jsx-runtime";
import { Loader } from 'lucide-react';
const LoaderComponent = () => {
    return (_jsx("div", { className: 'min-h-screen w-full flex justify-center items-center', children: _jsx(Loader, { className: 'text-emerald-500 animate-spin w-9' }) }));
};
export default LoaderComponent;
