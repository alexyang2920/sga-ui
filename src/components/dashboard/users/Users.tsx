import cx from 'clsx';
import { useState } from 'react';
import { Table, Checkbox, ScrollArea, Group, Text, rem } from '@mantine/core';
import classes from './Users.module.css';
import { User } from './interfaces';

const data = [
  {
    id: 1,
    name: 'Robert Wolfkisser',
    email: 'rob_wolf@gmail.com',
    role: "Admin",
  },
  {
    id: 2,
    name: 'Jill Jailbreaker',
    email: 'jj@breaker.com',
    role: "General",
  },
  {
    id: 3,
    name: 'Henry Silkeater',
    email: 'henry@silkeater.io',
    role: "Mentor",
  },
  {
    id: 4,
    name: 'Bill Horsefighter',
    email: 'bhorsefighter@gmail.com',
    role: "Volunteer",
  },
  {
    id: 5,
    name: 'Jeremy Footviewer',
    email: 'jeremy@foot.dev',
    role: "General",
  },
] as User[];

export function DashboardUsers() {
  const [selection, setSelection] = useState<number[]>([]);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.role}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>  
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
              />
            </Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}