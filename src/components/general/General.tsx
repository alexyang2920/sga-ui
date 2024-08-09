import { Container } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { AboutUs } from "./AboutUs";
import { Home } from "./home/Home";
import { NotFound } from "../shared/NotFound";
import { SupportUs } from "./SupportUs";
import { LoginPage } from "./auth/LoginPage";
import { SignupPage } from "./auth/SignupPage";
import { AppFooter } from "./layout/Footer";
import { AppHeader } from "./layout/Header";
import { EventPage } from "./events/EventPage";


export function General() {

    return (
        <Container
            fluid
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppHeader />
            <Container
                style={{
                    flex: 1
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/support-us" element={<SupportUs />} />
                    <Route path="/events/:id" element={<EventPage />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Container>
            <AppFooter />
        </Container>
    )
}