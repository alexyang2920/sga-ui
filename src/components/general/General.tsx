import { Container } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { AboutUs } from "./AboutUs";
import { HomePage } from "./HomePage";
import { NotFoundPage } from "./NotFoundPage";
import { SupportUs } from "./SupportUs";
import { LoginPage } from "./auth/LoginPage";
import { SignupPage } from "./auth/SignupPage";
import { AppFooter } from "./layout/Footer";
import { AppHeader } from "./layout/Header";


export function General() {

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
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </Container>
            <AppFooter />
        </Container>
    )
}