import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";

import awsconfig from "./aws-exports.js";

Amplify.configure(awsconfig);

export function App({ signOut, user }: WithAuthenticatorProps) {
    return (
        <>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
        </>
    );
}

const AppWithAuthenticator = withAuthenticator(App);
export default AppWithAuthenticator;
