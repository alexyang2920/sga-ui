import cx from "clsx";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
    Table,
    Checkbox,
    Text,
    rem,
    Group,
    Button,
    ActionIcon,
    Pagination
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPencil, IconTrash } from "@tabler/icons-react";
import { EventModal } from "./EventModal";
import { ApiError, SGAEvent, type SGAEventCreate } from "../../../api/schemas";
import classes from "./Events.module.css";
import useApi from "../../../hooks/useApi";
import { ErrorAlert } from "../../shared/ErrorAlert";
import Loading from "../../shared/Loading";
import { showExcellent, showOops } from "../../shared/notification";
import { ConfirmDeletionModal } from "../../shared/ConfirmDeletionModal";

import { toDateString, toDateValue } from "../../shared/dateUtils";


type PaginatedEvent = Omit<SGAEvent, 'start_date_time' | 'end_date_time'> & {
    start_date_time: string | null;
    end_date_time: string | null;
};


interface PaginatedEventsResult {
    total_count: number;
    page_size: number;
    page_number: number;
    items: PaginatedEvent[];
}


interface DataType {
    totalCount: number;
    events: SGAEvent[];
}


const PAGE_SIZE = 20;


export function DashboardEvents() {
    const [modalOpened, { open: openModal, close: closeModal }] =
        useDisclosure(false);

    const [deletingEvent, setDeletingEvent] = useState<SGAEvent | null>(null);
    const [editingEvent, setEditingEvent] = useState<SGAEvent | null>(null);

    const { apiGet, apiPost, apiPut, apiDelete } = useApi();

    const [data, setData] = useState<DataType>({
        totalCount: 0,
        events: []
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [selection, setSelection] = useState<number[]>([]);

    const [activePage, setActivePage] = useState<number>(1);

    const fetchData = useCallback(() => {
        apiGet(`/api/events?page_number=${activePage}&page_size=${PAGE_SIZE}`)
            .then((res: PaginatedEventsResult) => {
                setData({
                    totalCount: res.total_count,
                    events: res.items.map((x) => ({
                        ...x,
                        start_date_time: toDateValue(x.start_date_time),
                        end_date_time: toDateValue(x.end_date_time)
                    }))
                });
            })
            .catch((error) => {
                setError((error as ApiError).message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [apiGet, activePage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleRow = useCallback((id: number) => {
        setSelection((current) => {
            return current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id];
        });
    }, []);

    const toggleAll = useCallback(() => {
        setSelection((current) => {
            return current.length === data.events.length
                ? []
                : data.events.map((item) => item.id);
        });
    }, []);

    const handleCreate = useCallback(
        async (sgaEvent: SGAEventCreate) => {
            const payload = {
                ...sgaEvent,
                start_date_time:
                    sgaEvent.start_date_time?.toISOString() ?? null,
                end_date_time: sgaEvent.end_date_time?.toISOString() ?? null
            };
            try {
                const event = await apiPost("/api/events", payload);
                closeModal();
                await fetchData();
                showExcellent({
                    message: `The event ${event.title} has been created successfully.`
                });
            } catch (error) {
                showOops({ error: error as ApiError });
            }
        },
        [apiPost, closeModal, fetchData]
    );

    const handleDelete = useCallback(async () => {
        if (!deletingEvent) {
            return;
        }

        try {
            await apiDelete(`/api/events/${deletingEvent.id}`);
            setDeletingEvent(null);
            await fetchData();
            showExcellent({
                message: `The event ${deletingEvent.title} has been deleted successfully.`
            });
        } catch (error) {
            showOops({ error: error as ApiError });
        }
    }, [apiDelete, deletingEvent, fetchData]);

    const handleEdit = useCallback(
        async (sgaEvent: SGAEventCreate) => {
            if (!editingEvent) {
                return;
            }

            const payload = {
                ...sgaEvent,
                start_date_time:
                    sgaEvent.start_date_time?.toISOString() ?? null,
                end_date_time: sgaEvent.end_date_time?.toISOString() ?? null
            };

            try {
                const event = await apiPut(
                    `/api/events/${editingEvent.id}`,
                    payload
                );
                setEditingEvent(null);
                setData((current) => ({
                    ...current,
                    events: current.events.map((x) => {
                        return x.id === event.id
                            ? {
                                ...event,
                                start_date_time: toDateValue(
                                    event.start_date_time
                                ),
                                end_date_time: toDateValue(
                                    event.end_date_time
                                )
                            }
                            : x;
                    })
                }));
                showExcellent({
                    message: `The event ${event.title} has been updated successfully.`
                });
            } catch (error) {
                showOops({ error: error as ApiError });
            }
        },
        [apiPut, editingEvent]
    );

    const rows = useMemo(() => {
        return data.events.map((item) => {
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
                    <Table.Td>{item.id}</Table.Td>
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
                                <IconPencil
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                    onClick={() => setEditingEvent(item)}
                                />
                            </ActionIcon>
                            <ActionIcon color="red" variant="transparent">
                                <IconTrash
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                    onClick={() => setDeletingEvent(item)}
                                />
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
            <Text fw={600} pb={"md"}>
                Events
            </Text>
            {error && <ErrorAlert error={error} />}
            {modalOpened && (
                <EventModal
                    title="Create New Event"
                    opened={modalOpened}
                    close={closeModal}
                    onSubmit={handleCreate}
                />
            )}
            {editingEvent && (
                <EventModal
                    title="Edit Event"
                    opened={editingEvent != null}
                    close={() => setEditingEvent(null)}
                    selectedEvent={editingEvent}
                    onSubmit={handleEdit}
                />
            )}
            {deletingEvent && (
                <ConfirmDeletionModal
                    opened={deletingEvent !== null}
                    close={() => {
                        setDeletingEvent(null);
                    }}
                    handleDelete={handleDelete}
                />
            )}
            <Group>
                <Button
                    leftSection={<IconEdit size={14} />}
                    variant="default"
                    onClick={() => {
                        openModal();
                    }}
                >
                    Create New Event
                </Button>
            </Group>
            <Table miw={800} verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ width: rem(40) }}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={selection.length === data.events.length}
                                indeterminate={
                                    selection.length > 0 &&
                                    selection.length !== data.events.length
                                }
                            />
                        </Table.Th>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Start Date Time</Table.Th>
                        <Table.Th>End Date Time</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination total={Math.ceil(data.totalCount / PAGE_SIZE)} siblings={1} value={activePage} mt="lg" onChange={setActivePage} />
        </>
    );
}
