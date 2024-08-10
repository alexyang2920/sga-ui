import { AppShell, Burger, Container, Divider, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AboutUs } from './AboutUs';
import { SupportUs } from './SupportUs';
import { LoginPage } from './auth/LoginPage';
import { SignupPage } from './auth/SignupPage';
import { EventPage } from './events/EventPage';
import { Home } from './home/Home';

import { useCallback } from 'react';
import useAuth from '../../hooks/useAuth';

import SGALogo from '../shared/SGALogo';
import { NotFound } from '../shared/NotFound';

import { AuthMenu } from './layout/AuthMenu';
import { SiteMenu } from './layout/SiteMenu';
import { Footer } from './layout/Footer';


export function Site() {
    const [navBarOpened, { toggle: toggleNavBar, close: closeNavBar }] = useDisclosure(false);

    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = useCallback(() => {
        closeNavBar();
        logout();
        navigate("/", { replace: true });
    }, [navigate, logout, closeNavBar])

    const handleNavigate = useCallback((link: string) => {
        return () => {
            closeNavBar();
            navigate(link);
        }
    }, [navigate, closeNavBar]);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'md', collapsed: { desktop: true, mobile: !navBarOpened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={navBarOpened} onClick={toggleNavBar} hiddenFrom="md" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Group gap="xs">
                            <SGALogo />
                            <Text fw={500} c="#58ae93">Share & Grow</Text>
                        </Group>
                        <Group ml="xl" gap={0} visibleFrom="md">
                            <SiteMenu closeNavBar={closeNavBar} isMobile={false} />
                        </Group>
                        <Group visibleFrom='md'>
                            <AuthMenu
                                isMobile={false}
                                handleLogout={handleLogout}
                                handleNavigate={handleNavigate}
                            />
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <SiteMenu closeNavBar={closeNavBar} isMobile={true} />

                <Divider my="sm" />

                <Group justify="center" grow pb="xl" px="md" mb="xl" >
                    <AuthMenu
                        isMobile={true}
                        handleLogout={handleLogout}
                        handleNavigate={handleNavigate}
                    />
                </Group>
            </AppShell.Navbar>

            <AppShell.Main>
                <Container>
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
            </AppShell.Main>

            <Footer />
        </AppShell>
    );
}