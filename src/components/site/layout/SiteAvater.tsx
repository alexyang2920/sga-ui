import { Menu, rem, Avatar, Box } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import useAuth from "../../../hooks/useAuth";
import { ProfileMenu } from "./ProfileMenu";

const getInitialName = (name: string) => {
    let parts = name.split(" ");
    if (parts.length >= 2) {
        return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2);
};

interface AvatarMenuProps {
    handleNavigate: (link: string) => () => void;
    handleLogout: () => void;
}

export function SiteAvater({ handleNavigate, handleLogout }: AvatarMenuProps) {
    const { user } = useAuth();

    return (
        <Box visibleFrom="md">
            <Menu
                shadow="md"
                width={200}
                trigger="click"
                openDelay={100}
                closeDelay={200}
            >
                <Menu.Target>
                    <Avatar
                        color="blue"
                        radius="xl"
                        style={{ cursor: "pointer" }}
                        visibleFrom="md"
                    >
                        {getInitialName(user?.name ?? "")}
                    </Avatar>
                </Menu.Target>

                <Menu.Dropdown visibleFrom="md">
                    <ProfileMenu handleNavigate={handleNavigate} />
                    <Menu.Divider />
                    <Menu.Item
                        color="red"
                        leftSection={
                            <IconLogout
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                        onClick={handleLogout}
                    >
                        Sign out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Box>
    );
}
