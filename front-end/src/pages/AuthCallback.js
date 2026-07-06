import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const AuthCallback = () => {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    const userCreateAttemept = useRef(false);
    useEffect(() => {
        const createUserInDB = async () => {
            if (!isLoaded || !user || userCreateAttemept.current)
                return;
            userCreateAttemept.current = true;
            try {
                const newUser = await axiosInstance.post("/auth/callback", {
                    id: user.id,
                    fullName: user.fullName,
                    imageUrl: user.imageUrl
                });
            }
            catch (error) {
            }
            finally {
                navigate("/");
            }
        };
        createUserInDB();
    }, [isLoaded, user, navigate]);
    return _jsx("div", { className: "h-screen w-full flex justify-center items-center bg-black", children: _jsxs("div", { className: "bg-zinc-800/50 shadow-sm shadow-zinc-800 gap-y-2 px-24 rounded-2xl  py-3  flex items-center flex-col justify-center", children: [_jsx(Loader, { className: "animate-spin text-emerald-500" }), _jsx("h1", { className: "text-lg font-bold", children: "Logging You in." }), _jsx("h3", { className: "text-sm", children: "Redirecting...." })] }) });
};
export default AuthCallback;
