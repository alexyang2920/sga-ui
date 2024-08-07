import cx from "clsx";
import { useState } from "react";
import { Table, Checkbox, Text, rem, Group, Button, ActionIcon } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import classes from "./Events.module.css";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EventModal } from "./EventModal";

const data = [
    {
        id: "1",
        title: "Robert Wolfkisser",
        beginDate: "2024-04-09",
        endDate: "2024-04-10"
    },
    {
        id: "2",
        title: "Jill Jailbreaker",
        beginDate: "2024-04-09",
        endDate: "2024-04-10"
    },
    {
        id: "3",
        title: "Henry Silkeater",
        beginDate: "2024-04-09",
        endDate: "2024-04-10"
    },
    {
        id: "4",
        title: "Bill Horsefighter",
        beginDate: "2024-04-09",
        endDate: "2024-04-10"
    },
    {
        id: "5",
        title: "Jeremy Footviewer",
        beginDate: "2024-04-09",
        endDate: "2024-04-10"
    }
];

export function DashboardEvents() {
    const [modalOpened, { open: openModal, close: closeModal } ] = useDisclosure(false);

    const [selection, setSelection] = useState<string[]>([]);
    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    const toggleAll = () =>
        setSelection((current) =>
            current.length === data.length ? [] : data.map((item) => item.id)
        );

    const handleSubmit = () => {};

    const rows = data.map((item) => {
        const selected = selection.includes(item.id);
        return (
            <Table.Tr
                key={item.id}
                className={cx({ [classes.rowSelected]: selected })}
            >
                <Table.Td>
                    <Checkbox
                        checked={selection.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                    />
                </Table.Td>
                <Table.Td>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                </Table.Td>
                <Table.Td>{item.beginDate}</Table.Td>
                <Table.Td>{item.endDate}</Table.Td>
                <Table.Td>
                    <Group gap="xs">
                        <ActionIcon color="gray" variant="transparent">
                            <IconEdit onClick={() => {}} />
                        </ActionIcon>
                        <ActionIcon color="red" variant="transparent">
                            <IconTrash onClick={() => {}} />
                        </ActionIcon>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <>
            <Text fw={600} pb={"md"}>Events</Text>
            <EventModal close={closeModal} title="Create New Event" opened={modalOpened} onSubmit={handleSubmit} />
            <Group>
                <Button leftSection={<IconEdit size={14} />} variant="default" onClick={() => {
                    openModal();
                }}>
                    Create New Event
                </Button>
            </Group>
            <Table miw={800} verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ width: rem(40) }}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={selection.length === data.length}
                                indeterminate={
                                    selection.length > 0 &&
                                    selection.length !== data.length
                                }
                            />
                        </Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Begin Date</Table.Th>
                        <Table.Th>End Date</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}
