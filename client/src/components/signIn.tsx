import { Button } from "@/components/ui/button";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

const AuthComponents = (props: {
    setShowAuthenticator: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Authenticator hideSignUp />
            <Button onClick={() => props.setShowAuthenticator(false)}>
                Cancel
            </Button>
        </div>
    );
};

const SignInButton = () => {
    const [showAuthenticator, setShowAuthenticator] = useState(false);
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);

    useEffect(() => {
        if (authStatus === "authenticated") {
            setShowAuthenticator(false);
        }
    }, [authStatus]);

    return (
        <div>
            {showAuthenticator && authStatus === "unauthenticated" ? (
                <AuthComponents setShowAuthenticator={setShowAuthenticator} />
            ) : (
                <button onClick={() => setShowAuthenticator(true)}>
                    Sign In
                </button>
            )}
        </div>
    );
};

export default SignInButton;
