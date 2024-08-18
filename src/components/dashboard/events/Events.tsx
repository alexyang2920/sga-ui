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
    Pagination,
    TextInput,
    CloseButton
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import { EventModal } from "./EventModal";
import { ApiError, SGAEvent, type SGAEventCreate, type PaginatedEventsResult } from "../../../api/schemas";
import classes from "./Events.module.css";
import useApi from "../../../hooks/useApi";
import { ErrorAlert } from "../../shared/ErrorAlert";
import Loading from "../../shared/Loading";
import { showExcellent, showOops } from "../../shared/notification";
import { ConfirmDeletionModal } from "../../shared/ConfirmDeletionModal";

import { toDateString, toDateValue } from "../../shared/dateUtils";


interface DataType {
    totalCount: number;
    events: SGAEvent[];
}


const PAGE_SIZE = 20;


type ColumnDef = 'start_date_time' | 'end_date_time' | 'id' | 'location' | 'title';


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

    const [search, setSearch] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [sort, setSort] = useState<{ column: ColumnDef; direction: 'asc' | 'desc' }>({
        column: 'id',
        direction: 'desc',
    });

    const handleSearch = useCallback(() => {
        setSearchTerm(search.trim());
    }, [search]);

    const handleSearchInputKeyDown = useCallback((event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleSearch();
          }
    }, [handleSearch]);

    const handleSort = useCallback((column: ColumnDef) => {
        setSort(prevSort => ({
            column: column,
            direction: prevSort.column === column ? (prevSort.direction === 'asc' ? 'desc' : 'asc') : 'asc',
        }));
    }, []);

    const fetchData = useCallback(() => {
        apiGet(`/api/events?page_number=${activePage}&page_size=${PAGE_SIZE}&sort_by=${sort.column}&sort_order=${sort.direction}&search=${searchTerm}`)
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
    }, [apiGet, activePage, sort, searchTerm]);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', minWidth: '500px'}}>
                <Button
                    leftSection={<IconEdit size={14} />}
                    variant="default"
                    onClick={() => {
                        openModal();
                    }}
                >
                    Create New Event
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '500px' }}>
                    <TextInput
                        placeholder="Search by title"
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        style={{ flex: 1, marginRight: '0.5rem' }}
                        onKeyDown={handleSearchInputKeyDown}
                        leftSection={<IconSearch size={14} />}
                        rightSection={
                            <CloseButton
                                aria-label="Clear input"
                                onClick={() => setSearch('')}
                                style={{ display: search ? undefined : 'none' }}
                            />
                        }
                    />
                    <Button
                        variant="default"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
            </div>
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
                        <Table.Th>
                            <Button
                                variant="subtle"
                                onClick={() => handleSort('id')}
                                style={{ width: '100%', textAlign: 'left' }}
                            >
                                ID {sort.column === 'id' && (sort.direction === 'asc' ? '↑' : '↓')}
                            </Button>
                        </Table.Th>
                        <Table.Th>
                            <Button
                                variant="subtle"
                                onClick={() => handleSort('title')}
                                style={{ width: '100%', textAlign: 'left' }}
                            >
                                Title {sort.column === 'title' && (sort.direction === 'asc' ? '↑' : '↓')}
                            </Button>
                        </Table.Th>
                        <Table.Th>
                            <Button
                                variant="subtle"
                                onClick={() => handleSort('location')}
                                style={{ width: '100%', textAlign: 'left' }}
                            >
                                Location {sort.column === 'location' && (sort.direction === 'asc' ? '↑' : '↓')}
                            </Button>
                        </Table.Th>
                        <Table.Th>
                            <Button
                                variant="subtle"
                                onClick={() => handleSort('start_date_time')}
                                style={{ width: '100%', textAlign: 'left' }}
                            >
                                Start Date Time {sort.column === 'start_date_time' && (sort.direction === 'asc' ? '↑' : '↓')}
                            </Button>
                        </Table.Th>
                        <Table.Th>
                            <Button
                                variant="subtle"
                                onClick={() => handleSort('end_date_time')}
                                style={{ width: '100%', textAlign: 'left' }}
                            >
                                End Date Time {sort.column === 'end_date_time' && (sort.direction === 'asc' ? '↑' : '↓')}
                            </Button>
                        </Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination total={Math.ceil(data.totalCount / PAGE_SIZE)} siblings={1} value={activePage} mt="lg" onChange={setActivePage} />
        </>
    );
}
