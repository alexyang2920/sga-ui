import { Container } from "@mantine/core";
import { AppHeader } from "./Header";
import { AppFooter } from "./Footer";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./general/HomePage";
import { NotFoundPage } from "./general/NotFoundPage";
import { LoginPage } from "./general/auth/LoginPage";
import { SignupPage } from "./general/auth/SignupPage";
import { AboutUs } from "./general/AboutUs";
import { SupportUs } from "./general/SupportUs";
import { Dashboard } from "./dashboard/Dashboard";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import Loading from "./shared/Loading";

export default function App() {
    const { token, logout, setUser } = useAuth();
    const { apiGet } = useApi();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token !== null) {
            const fetchUser = async () => {
                try {
                    const user = await apiGet("/api/users/me");
                    setUser(user);
                } catch (error) {
                    console.log(error);
                    logout();
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [token, logout, setUser]);

    if (isLoading) {
        return <Loading visible={isLoading} />;
    }

    return (
        <Container
            fluid
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <AppHeader />
            <Container style={{ flex: 1, overflowY: "auto" }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/support-us" element={<SupportUs />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/Dashboard/*" element={<Dashboard />} />
                    </Route>
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </Container>
            <AppFooter />
        </Container>
    );
}
