import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import SGALogo from "../../shared/SGALogo";
import { NavBar } from './NavBar';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout : React.FC<DashboardLayoutProps> = ({children}) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
                <NavBar />
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
} 