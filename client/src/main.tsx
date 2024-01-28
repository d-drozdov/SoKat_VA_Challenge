import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import awsconfig from "./aws-exports.js";
import "./index.css";

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Authenticator.Provider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Authenticator.Provider>
);
