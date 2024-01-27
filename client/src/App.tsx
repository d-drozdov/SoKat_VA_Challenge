import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import SignInButton from "./components/signIn";

function App() {
    const { user, signOut, authStatus } = useAuthenticator((context) => [
        context.user,
        context.authStatus,
    ]);
    return (
        <div>
            <SignInButton />
            {authStatus == "authenticated" && (
                <>
                    <h1>Hello {user?.username}</h1>
                    <button onClick={signOut}>Sign out</button>
                </>
            )}
        </div>
    );
}

export default App;
