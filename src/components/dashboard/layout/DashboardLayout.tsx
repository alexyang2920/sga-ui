import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import SGALogo from "../../shared/SGALogo";
import { NavBar } from './NavBar';
import { ReactNode, useCallback } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout : React.FC<DashboardLayoutProps> = ({children}) => {
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop, close: closeDesktop }] = useDisclosure(true);

    const handleClose = useCallback(() => {
        closeMobile();
        closeDesktop();
    }, [closeMobile, closeDesktop])

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    <SGALogo />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <NavBar handleClose={handleClose} />
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
} 