import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { useSignIn } from '@clerk/react';
const SignInOAuthButton = () => {
    const { signIn } = useSignIn();
    if (!signIn)
        return null;
    const signInWithGoogle = () => {
        signIn.sso({
            strategy: "oauth_google",
            redirectCallbackUrl: "/sso-callback",
            redirectUrl: "/auth-callback",
        });
    };
    return (_jsx("div", { children: _jsx(Button, { className: 'btn btn-primary', onClick: signInWithGoogle, children: "Signin with Google" }) }));
};
export default SignInOAuthButton;
