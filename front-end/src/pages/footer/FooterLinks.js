import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const FooterLinks = () => {
    return (_jsx("footer", { children: _jsx(Button, { children: _jsx(Link, { to: "/", children: "Home" }) }) }));
};
export default FooterLinks;
