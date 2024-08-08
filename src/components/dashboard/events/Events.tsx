import cx from "clsx";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Table, Checkbox, Text, rem, Group, Button, ActionIcon } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPencil, IconTrash } from "@tabler/icons-react";
import { EventModal } from "./EventModal";
import { ApiError, SGAEvent, type SGAEventCreate } from "../../../api/schemas";
import classes from "./Events.module.css";
import useApi from "../../../hooks/useApi";
import { ErrorAlert } from "../../shared/ErrorAlert";
import Loading from "../../shared/Loading";
import { showExcellent, showOops } from "../../shared/notification";
import { ConfirmDeletionModal } from "../../shared/ConfirmDeletionModal";

function toDateString(dateValue: Date | null) {
    return dateValue?.toISOString() ?? '';
}

function toDateValue(dateString: string | null) {
    return dateString ? new Date(dateString) : null;
}

export function DashboardEvents() {
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

    const [deletingEvent, setDeletingEvent] = useState<SGAEvent | null>(null);

    const { apiGet, apiPost, apiDelete } = useApi();

    const [data, setData] = useState<SGAEvent[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [selection, setSelection] = useState<number[]>([]);

    useEffect(() => {
        apiGet("/api/events")
            .then((res: any[]) => {
                setData(res.map(x => ({
                    ...x,
                    start_date_time: toDateValue(x.start_date_time),
                    end_date_time: toDateValue(x.end_date_time),
                })));
            })
            .catch((error) => {
                setError((error as ApiError).message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [apiGet]);

    const toggleRow = useCallback((id: number) => {
        setSelection((current) => {
            return current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        })
    }, []);

    const toggleAll = useCallback(() => {
        setSelection((current) => {
            return current.length === data.length ? [] : data.map((item) => item.id);
        });
    }, []);

    const handleSubmit = useCallback(async (sgaEvent: SGAEventCreate) => {
        const payload = {
            ...sgaEvent,
            start_date_time: sgaEvent.start_date_time?.toISOString() ?? null,
            end_date_time: sgaEvent.end_date_time?.toISOString() ?? null
        };
        try {
            const event = await apiPost('/api/events', payload);
            setData((current) => [...current, event]);
            closeModal();
            showExcellent({ message: `The event ${event.title} has been created successfully.` });
        } catch (error) {
            showOops({ error: error as ApiError });
        }
    }, [apiPost, closeModal]);

    const handleDelete = useCallback(async () => {
        if (!deletingEvent) {
            return;
        }

        try {
            await apiDelete(`/api/events/${deletingEvent.id}`);
            setDeletingEvent(null);
            setData((current) => {
                return current.filter(x => x.id !== deletingEvent.id);
            });
            showExcellent({ message: `The event ${deletingEvent.title} has been deleted successfully.` });
        } catch (error) {
            showOops({ error: error as ApiError });
        }
    }, [apiDelete, deletingEvent]);

    const rows = useMemo(() => {
        return data.map((item) => {
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
                    <Table.Td>{item.location}</Table.Td>
                    <Table.Td>{toDateString(item?.start_date_time)}</Table.Td>
                    <Table.Td>{toDateString(item?.end_date_time)}</Table.Td>
                    <Table.Td>
                        <Group gap={0} justify="flex-end">
                            <ActionIcon color="gray" variant="transparent">
                                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} onClick={() => { }} />
                            </ActionIcon>
                            <ActionIcon color="red" variant="transparent">
                                <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} onClick={() => setDeletingEvent(item)} />
                            </ActionIcon>
                        </Group>
                    </Table.Td>
                </Table.Tr>
            );
        });
    }, [selection, data]);

    if (loading) {
        return <Loading visible={loading} />;
    }

    return (
        <>
            <Text fw={600} pb={"md"}>Events</Text>
            {error && <ErrorAlert error={error} />}
            {modalOpened && (
                <EventModal
                    title="Create New Event"
                    opened={modalOpened}
                    close={closeModal}
                    onSubmit={handleSubmit}
                />
            )}
            {deletingEvent && (
                <ConfirmDeletionModal
                    opened={deletingEvent !== null}
                    close={() => { setDeletingEvent(null) }}
                    handleDelete={handleDelete}
                />)
            }
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
                                    selection.length > 0 && selection.length !== data.length
                                }
                            />
                        </Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Start Date Time</Table.Th>
                        <Table.Th>End Date Time</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}
