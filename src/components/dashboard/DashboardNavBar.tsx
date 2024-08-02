import {
  IconAbc,
  IconUsers,
  IconForms,
  IconDashboard,
} from '@tabler/icons-react';
import classes from './DashboardNavBar.module.css';
import { Anchor } from '@mantine/core';
import { useLocation } from 'react-router-dom';

const data = [
  { link: '/dashboard', label: 'Home', icon: IconDashboard },
  { link: '/dashboard/users', label: 'Users', icon: IconUsers },
  { link: '/dashboard/events', label: 'Events', icon: IconAbc },
  { link: '/dashboard/forms', label: 'Forms', icon: IconForms },
];

function getActiveLable(pathname: string) {
  const names = pathname.split("/");
  return names.length >= 3 ? names[2] : "home";
}

export function DashboardNavBar() {
  const location = useLocation();

  const activeLabel = getActiveLable(location.pathname);

  const links = data.map((item) => (
    <Anchor
      className={classes.link}
      data-active={item.label.toLowerCase() === activeLabel || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Anchor>
  ));

  return (
    <nav className={classes.navbar}>
      {links}
    </nav>
  );
}