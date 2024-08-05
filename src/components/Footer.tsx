import { Text, Container, ActionIcon, Group, rem, Anchor } from "@mantine/core";
import {
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandInstagram
} from "@tabler/icons-react";
import classes from "./Footer.module.css";

export function AppFooter() {
    return (
        <footer className={classes.footer}>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    © {new Date().getFullYear()} sharegrow.org All rights
                    reserved.
                </Text>

                <Group
                    gap={0}
                    className={classes.social}
                    justify="flex-end"
                    wrap="nowrap"
                >
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <Anchor
                            href="https://twitter.com/ShareandGrow2"
                            target="_blank"
                            underline="never"
                            rel="noopener noreferrer"
                            c="gray"
                        >
                            <IconBrandTwitter
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5}
                            />
                        </Anchor>
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <Anchor
                            href="https://www.youtube.com/channel/UCCcgTMbM45TMXGEgRaFDcEg"
                            target="_blank"
                            underline="never"
                            rel="noopener noreferrer"
                            c="gray"
                        >
                            <IconBrandYoutube
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5}
                            />
                        </Anchor>
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <Anchor
                            href="https://www.instagram.com/shareandgroworg/"
                            target="_blank"
                            underline="never"
                            rel="noopener noreferrer"
                            c="gray"
                        >
                            <IconBrandInstagram
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5}
                            />
                        </Anchor>
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
