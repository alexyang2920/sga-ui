import { Menu, rem, Avatar, Box } from "@mantine/core";
import {
    IconSettings,
    IconDashboard,
    IconAbc,
    IconSchool,
    IconLogout
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { RoleEnum } from "../../../api/schemas";
import { useCallback, useMemo } from "react";

const getInitialName = (name: string) => {
    let parts = name.split(" ");
    if (parts.length >= 2) {
        return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2);
};

interface AvatarMenuProps {
    closeNavBar: () => void;
}

export function SiteAvater({ closeNavBar }: AvatarMenuProps) {
    const navigate = useNavigate();
    const { logout, user, hasRole } = useAuth();

    const handleNavigate = useCallback((link: string) => {
        return () => {
            closeNavBar();
            navigate(link);
        };
    }, [closeNavBar])

    const handleLogout = useCallback(() => {
        closeNavBar();
        logout();
        navigate("/", { replace: true });
    }, [logout, closeNavBar]);

    const menuItems = useMemo(() => {
        return (
            <>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Profile
                </Menu.Item>
                <Menu.Item leftSection={ <IconAbc style={{ width: rem(14), height: rem(14) }} />}>
                    Volunteer
                </Menu.Item>
                <Menu.Item leftSection={ <IconSchool style={{ width: rem(14), height: rem(14) }}/>}>
                    Tutoring
                </Menu.Item>

                {hasRole(RoleEnum.Admin) && (
                    <>
                        <Menu.Divider />
                        <Menu.Item
                            leftSection={ <IconDashboard style={{ width: rem(14), height: rem(14) }}/>}
                            onClick={handleNavigate("/dashboard")}
                        >
                            Dashboard
                        </Menu.Item>
                    </>
                )}

                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }}/>}
                    onClick={handleLogout}
                >
                    Sign out
                </Menu.Item>
            </>
        );
    }, [handleLogout, handleNavigate, hasRole]);

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

                <Menu.Dropdown visibleFrom="md">{menuItems}</Menu.Dropdown>
            </Menu>
        </Box>
    );
}
