import { IconProps, Icon, IconSettings, IconAbc, IconSchool, IconDashboard } from "@tabler/icons-react";
import { RoleEnum } from "../../../api/schemas";
import { useMemo } from "react";
import { Anchor, Menu, rem } from "@mantine/core";
import useAuth from "../../../hooks/useAuth";
import React from "react";
import classes from './SiteMenu.module.css';
import profileClasses  from './ProfileMenu.module.css';


interface ProfileLink {
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
    title: string;
    link: string;
    roles?: RoleEnum[];
}

const profileLinkData = [
    {
        icon: IconSettings,
        title: "Profile",
        link: "/events",
    },
    {
        icon: IconAbc,
        title: "Volunteer",
        link: "/clubs",
    },
    {
        icon: IconSchool,
        title: "Tutoring",
        link: "/tutoring-programs",
    },
    {
        icon: IconDashboard,
        title: "Dashboard",
        link: "/dashboard",
        roles: [RoleEnum.Admin]
    }
] as ProfileLink[];


interface ProfileMenuProps {
    handleNavigate: (link: string) => () => void;
}

export function ProfileMenu({ handleNavigate }: ProfileMenuProps) {
    const { hasRole } = useAuth();

    const menuItems = useMemo(() => {
        return profileLinkData
            .filter(item => !item.roles || (item.roles.filter(role => hasRole(role)).length ?? 0) > 0)
            .map(item => (
                <React.Fragment key={item.title}>
                    <Menu.Item
                        leftSection={<item.icon style={{ width: rem(14), height: rem(14) }} />}
                        onClick={handleNavigate(item.link)}
                    >
                        {item.title}
                    </Menu.Item>
                </React.Fragment>
            ));
    }, [handleNavigate]);

    return menuItems;
}

export function ProfileSiteMenu({ handleNavigate }: ProfileMenuProps) {
    const { hasRole } = useAuth();

    const menuItems = useMemo(() => {
        return profileLinkData
            .filter(item => !item.roles || (item.roles.filter(role => hasRole(role)).length ?? 0) > 0)
            .map(item => (
                <Anchor
                    className={classes.link}
                    onClick={handleNavigate(item.link)}
                    key={item.title}
                >
                    <item.icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} className={profileClasses.icon}/>
                    <span>{item.title}</span>
                </Anchor>
            ));
    }, [handleNavigate]);

    return menuItems;
}
