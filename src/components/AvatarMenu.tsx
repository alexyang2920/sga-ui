import { Menu, rem, Avatar } from '@mantine/core';
import {
    IconSettings,
    IconDashboard,
    IconAbc,
    IconSchool,
    IconLogout,
} from '@tabler/icons-react';

export function AvatarMenu() {
    return (
        <Menu shadow="md" width={200} trigger="click-hover" openDelay={100} closeDelay={200}>
            <Menu.Target>
                <Avatar color="blue" radius="xl" style={{ cursor: 'pointer' }}>AY</Avatar>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconAbc style={{ width: rem(14), height: rem(14) }} />}>
                    Volunteer
                </Menu.Item>
                <Menu.Item leftSection={<IconSchool style={{ width: rem(14), height: rem(14) }} />}>
                    Tutoring
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconDashboard style={{ width: rem(14), height: rem(14) }} />} >
                    Dashboard
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                    Sign out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}