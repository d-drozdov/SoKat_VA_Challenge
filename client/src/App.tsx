import AuthButton from "@/components/authButton";
import { getCurrentUser } from "@aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
// Corrected import
import { useEffect, useState } from "react";

function App() {
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);

    const [user, setUser] = useState("");

    useEffect(() => {
        async function fetchCurrentUser() {
            if (authStatus === "authenticated") {
                try {
                    const currentUser = await getCurrentUser();
                    setUser(currentUser.username || "");
                } catch (error) {
                    console.error("Error fetching current user", error);
                }
            }
        }
        void fetchCurrentUser();
    }, [authStatus]);

    return (
        <main className="flex flex-col items-center justify-center gap-5">
            <h1 className="pt-10 text-4xl font-semibold">
                SoKat VA Challenge Login
            </h1>

            <AuthButton />
            {authStatus === "authenticated" && user && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-semibold">Welcome {user}</p>
                    <p className="text-lg font-semibold">
                        You have successfully logged into our app!
                    </p>
                </div>
            )}
        </main>
    );
}

export default App;
