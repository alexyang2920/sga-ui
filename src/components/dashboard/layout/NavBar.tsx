import { useCallback, useMemo } from "react";
import {
    IconSwitchHorizontal,
    IconLogout,
    Icon360,
    IconAbc,
    IconDashboard,
    IconForms,
    IconUsers
} from "@tabler/icons-react";
import classes from "./NavBar.module.css";
import { Anchor, Group, Text } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const data = [
    { link: "/dashboard", label: "Home", icon: IconDashboard },
    { link: "/dashboard/users", label: "Users", icon: IconUsers },
    { link: "/dashboard/roles", label: "Roles", icon: Icon360 },
    { link: "/dashboard/events", label: "Events", icon: IconAbc },
    { link: "/dashboard/forms", label: "Forms", icon: IconForms }
];

function getActiveLable(pathname: string) {
    const names = pathname.split("/");
    return names.length >= 3 ? names[2] : "home";
}

interface NavBarProps {
    handleClose: () => void;
}

export function NavBar({ handleClose }: NavBarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();

    const activeLabel = getActiveLable(location.pathname);

    const handleClick = useCallback(
        (link: string) => {
            return () => {
                handleClose();
                navigate(link);
            };
        },
        [navigate, handleClose]
    );

    const handleNavigate = useCallback(
        (link: string) => {
            return (event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                navigate(link);
            };
        },
        [navigate]
    );

    const handleLogout = useCallback(() => {
        logout();
        navigate("/", { replace: true });
    }, [navigate, logout]);

    const links = useMemo(() => {
        return data.map((item) => (
            <Anchor
                className={classes.link}
                data-active={
                    item.label.toLowerCase() === activeLabel || undefined
                }
                onClick={handleClick(item.link)}
                key={item.label}
            >
                <item.icon className={classes.linkIcon} stroke={1.5} />
                <span>{item.label}</span>
            </Anchor>
        ));
    }, [handleClick]);

    return (
        <nav className={classes.navbar}>
            <Group className={classes.header} gap={1}>
                <Text>{user?.name}</Text>
                <Text>({user?.email})</Text>
            </Group>

            {links}

            <div className={classes.footer}>
                <a
                    href="#"
                    className={classes.link}
                    onClick={handleNavigate("/")}
                >
                    <IconSwitchHorizontal
                        className={classes.linkIcon}
                        stroke={1.5}
                    />
                    <span>Exit Dashboard</span>
                </a>

                <a
                    href="#"
                    className={classes.link}
                    onClick={handleLogout}
                    style={{ marginBottom: `calc(var(--mantine-spacing-xl))` }}
                >
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}
