// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/tiptap/styles.css';

import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { AuthProvider } from "./context/AuthProvider";
import App from "./components/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider>
                <AuthProvider>
                    <Notifications />
                    <App />
                </AuthProvider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);
