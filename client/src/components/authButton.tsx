import { Button } from "@/components/ui/button";
import { signOut } from "@aws-amplify/auth";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

const AuthComponents = (props: {
    setShowAuthenticator: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <div className="flex min-h-screen flex-col items-center  gap-3">
            <Authenticator hideSignUp />
            <Button
                className="w-full"
                onClick={() => props.setShowAuthenticator(false)}
            >
                Cancel
            </Button>
        </div>
    );
};

const AuthButton = () => {
    const [showAuthenticator, setShowAuthenticator] = useState(false);
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);

    useEffect(() => {
        if (authStatus === "authenticated") {
            setShowAuthenticator(false);
        }
    }, [authStatus]);

    const handleSignOut = () => {
        signOut().catch((error) => {
            console.error("Error signing out", error);
        });
    };

    if (showAuthenticator && authStatus === "unauthenticated") {
        return <AuthComponents setShowAuthenticator={setShowAuthenticator} />;
    }

    if (authStatus === "unauthenticated") {
        return (
            <Button onClick={() => setShowAuthenticator(true)}>Sign In</Button>
        );
    }

    return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default AuthButton;
