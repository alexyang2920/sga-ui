import { Container } from '@mantine/core';
import { AppHeader } from './Header';
import { AppFooter } from './Footer';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './general/HomePage';
import { NotFoundPage } from './general/NotFoundPage';
import { LoginPage } from './general/auth/LoginPage';
import { SignupPage } from './general/auth/SignupPage';
import { AboutUs } from './general/AboutUs';
import { SupportUs } from './general/SupportUs';
import { Dashboard } from './dashboard/Dashboard';

export default function App() {
    return (
        <Container fluid style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppHeader />
            <Container style={{ flex: 1, overflowY: 'auto' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/support-us" element={<SupportUs />} />
                    <Route path="/Dashboard/*" element={<Dashboard />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </Container>
            <AppFooter />
        </Container>
    );
}