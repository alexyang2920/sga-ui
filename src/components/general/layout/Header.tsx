import { useNavigate } from "react-router-dom";
import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    Anchor
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconCode,
    IconBook,
    IconCoin,
    IconChevronDown
} from "@tabler/icons-react";
import classes from "./Header.module.css";

import SGALogo from "../../shared/SGALogo";
import { AvatarMenu } from "./AvatarMenu";
import useAuth from "../../../hooks/useAuth";
import { ReactNode, useCallback, useMemo } from "react";

const resourcesLinkData = [
    {
        icon: IconCode,
        title: "Events",
        description: "Current and incoming events",
        link: "/events"
    },
    {
        icon: IconCoin,
        title: "Clubs",
        description: "Special interested clubs",
        link: "/clubs"
    },
    {
        icon: IconBook,
        title: "Tutoring Programs",
        description: "Summer tutoring programs",
        link: "/tutoring-programs"
    },
    {
        icon: IconCode,
        title: "Past Events",
        description: "Events happened in the past",
        link: "/past-events"
    }
];

export function AppHeader() {
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

    const theme = useMantineTheme();

    const handleButton = useCallback((href: string) => {
        return () => {
            closeDrawer();
            navigate(href);
        }
    }, [closeDrawer, navigate]);

    const handleNavigate = useCallback((href: string) => {
        return (event: React.MouseEvent<HTMLAnchorElement>) => {
            closeDrawer();
            event.preventDefault();
            navigate(href);
        }
    }, [closeDrawer, navigate]);

    const links = useMemo(() => {
        return resourcesLinkData.map((item) => (
            <UnstyledButton className={classes.subLink} key={item.title}>
                <Group wrap="nowrap" align="flex-start">
                    <ThemeIcon size={34} variant="default" radius="md">
                        <item.icon
                            style={{ width: rem(22), height: rem(22) }}
                            color={theme.colors.blue[6]}
                        />
                    </ThemeIcon>
                    <div>
                        <Text size="sm" fw={500}>
                            <Anchor onClick={handleButton(item.link)}>
                                {item.title}
                            </Anchor>
                        </Text>
                        <Text size="xs" c="dimmed">
                            {item.description}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>
        ));
    }, [theme, handleButton]);

    const authButtonsSection: ReactNode = useMemo(() => {
        return isAuthenticated ? (
            <AvatarMenu closeDrawer={closeDrawer} />
        ) : (
            <>
                <Button variant="default" onClick={handleButton('/login')}>
                    Log in
                </Button>
                <Button onClick={handleButton('/signup')}>Sign up</Button>
            </>
        );
    }, [isAuthenticated, handleButton, closeDrawer]);

    return (
        <Box pb={20}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <SGALogo />

                    <Group h="100%" gap={0} visibleFrom="md">
                        <a href="#" className={classes.link} onClick={handleNavigate("/")}>
                            Home
                        </a>
                        <HoverCard
                            width={600}
                            position="bottom"
                            radius="md"
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Resources
                                        </Box>
                                        <IconChevronDown
                                            style={{
                                                width: rem(16),
                                                height: rem(16)
                                            }}
                                            color={theme.colors.blue[6]}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>Resources</Text>
                                </Group>

                                <Divider my="sm" />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <a href="#" className={classes.link} onClick={handleNavigate("/student-board")} >
                            Student Board
                        </a>

                        <a href="#" className={classes.link} onClick={handleNavigate("/support-us")} >
                            Support Us
                        </a>

                        <a href="#" className={classes.link} onClick={handleNavigate("/about-us")}>
                            About
                        </a>
                    </Group>

                    <Group visibleFrom="md">
                        {authButtonsSection}
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom="md"
                    />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Share And Grow"
                hiddenFrom="md"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link} onClick={handleNavigate("/")} >
                        Home
                    </a>

                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinks}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Resources
                            </Box>
                            <IconChevronDown
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>

                    <a href="#" className={classes.link} onClick={handleNavigate("/student-board")} >
                        Student Board
                    </a>

                    <a href="#" className={classes.link} onClick={handleNavigate("/support-us")} >
                        Support Us
                    </a>

                    <a href="#" className={classes.link} onClick={handleNavigate("/about-us")}>
                        About
                    </a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        {authButtonsSection}
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
