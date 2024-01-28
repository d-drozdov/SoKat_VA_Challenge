import { useAuthenticator } from "@aws-amplify/ui-react";

// import { type AuthUser } from "aws-amplify/auth";
// import { useEffect, useState } from "react";
import AuthButton from "./components/authButton";

function App() {
    const { user, authStatus } = useAuthenticator((context) => [
        context.user,
        context.authStatus,
    ]);

    return (
        <main className="flex flex-col items-center justify-center gap-5">
            <h1 className="pt-10 text-4xl font-semibold">
                SoKat VA Challenge Login
            </h1>

            <AuthButton />
            {authStatus === "authenticated" && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-semibold">
                        Welcome {user?.username}
                    </p>
                    <p className="text-lg font-semibold">
                        You have successfully logged into our app!
                    </p>
                </div>
            )}
        </main>
    );
}

export default App;
