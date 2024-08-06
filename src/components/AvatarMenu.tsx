import { Menu, rem, Avatar } from "@mantine/core";
import {
    IconSettings,
    IconDashboard,
    IconAbc,
    IconSchool,
    IconLogout
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RoleEnum } from "../api/schemas";

const getInitialName = (name: string) => {
    let parts = name.split(" ");
    if (parts.length >= 2) {
        return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2);
};

export function AvatarMenu() {
    const navigate = useNavigate();
    const { logout, user, hasRole } = useAuth();
    return (
        <Menu
            shadow="md"
            width={200}
            trigger="click-hover"
            openDelay={100}
            closeDelay={200}
        >
            <Menu.Target>
                <Avatar color="blue" radius="xl" style={{ cursor: "pointer" }}>
                    {getInitialName(user?.name ?? '')}
                </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    leftSection={
                        <IconSettings
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Profile
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconAbc style={{ width: rem(14), height: rem(14) }} />
                    }
                >
                    Volunteer
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconSchool
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Tutoring
                </Menu.Item>

                {hasRole(RoleEnum.Admin) && (
                    <>
                        <Menu.Divider />
                        <Menu.Item
                            leftSection={
                                <IconDashboard
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                            onClick={() => {
                                navigate("/dashboard");
                            }}
                        >
                            Dashboard
                        </Menu.Item>
                    </>
                )}

                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={
                        <IconLogout
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                    onClick={() => {
                        logout();
                        navigate("/", { replace: true });
                    }}
                >
                    Sign out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
