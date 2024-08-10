import { UnstyledButton, Center, Box, rem, Collapse, useMantineTheme, Anchor, Group, ThemeIcon, Text, Divider, HoverCard, SimpleGrid, MantineTheme } from "@mantine/core";
import { IconBook, IconChevronDown, IconCode, IconCoin } from "@tabler/icons-react";
import classes from './SiteMenu.module.css';
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
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


interface SiteMenuProps {
    closeNavBar: () => void;
    isMobile: boolean;
}


export function SiteMenu({ closeNavBar, isMobile }: SiteMenuProps) {
    const navigate = useNavigate();

    const handleNavigate = useCallback((link: string) => {
        return () => {
            closeNavBar();
            navigate(link);
        }
    }, [navigate, closeNavBar]);

    return (
        <>
            <UnstyledButton className={classes.link} onClick={handleNavigate("/")} >
                Home
            </UnstyledButton>

            <ResourceMenu isMobile={isMobile} handleNavigate={handleNavigate}/>

            <UnstyledButton className={classes.link} onClick={handleNavigate("/student-board")} >
                Student Board
            </UnstyledButton>

            <UnstyledButton className={classes.link} onClick={handleNavigate("/support-us")} >
                Support Us
            </UnstyledButton>

            <UnstyledButton className={classes.link} onClick={handleNavigate("/about-us")}>
                About
            </UnstyledButton>

        </>
    )
}


interface ResourceMenuProps {
    handleNavigate: (link: string) => () => void;
    isMobile: boolean;
}


function ResourceMenu({ handleNavigate, isMobile }: ResourceMenuProps) {
    const theme = useMantineTheme();
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
                            <Anchor onClick={handleNavigate(item.link)}>
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
    }, [theme, handleNavigate]);

    const component = useMemo(() => {
        return isMobile ? <MobileResources links={links} theme={theme} /> : <DesktopResources links={links} theme={theme} />
    }, [isMobile, theme, links]);

    return component;
}

interface ResourcesProps {
    links: ReactNode[];
    theme: MantineTheme;
}


function MobileResources({ links, theme }: ResourcesProps) {
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

    return (
        <>
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
        </>
    );
}


function DesktopResources({ links, theme }: ResourcesProps) {
    return (
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
                        <Box component="span" mr={5}>Resources</Box>
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
    );
}