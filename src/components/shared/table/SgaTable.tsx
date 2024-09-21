import cx from "clsx";
import { useState, useCallback, useMemo, useEffect } from "react";
import {
    Table,
    Checkbox,
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
import { ApiError } from "../../../api/schemas";
import classes from "./SgaTable.module.css";
import { showExcellent, showOops } from "../notification";

import { SgaRecordCreate, SgaRecordUpdate, SgaRecord } from "./interfaces";
import { DeleteModal } from "./DeleteModal";
import { CreateEditModal } from './CreateEditModal';
import useApi from '../../../hooks/useApi';
import { ErrorAlert } from '../ErrorAlert';
import Loading from '../Loading';

type DirectionDef = 'asc' | 'desc';
type FieldType = 'boolean' | 'string' | 'number' | 'date' | 'richtext';

export interface ColumnDef {
    label: string;
    field: string;
    type: FieldType;
    format?: (value: any) => void;
    toValue?: (value: any) => void;
}

export interface FieldDef {
    label: string;
    name: string;
    type: FieldType;
}

interface QueryParams {
    pageNumber: number;
    pageSize: number;
    sortColumn: string;
    sortOrder: DirectionDef;
    searchTerm?: string;
}

interface PaginatedResult {
    total: number;
    records: SgaRecord[];
}


interface SgaTableProps {
    columns: ColumnDef[];
    baseUrl: string;
    createModalTitle?: string;
    createModalFields: FieldDef[];
    editModalTitle?: string;
    editModalFields: FieldDef[];
    searchPlaceHolder?: string;
}


export function SgaTable({
    columns,
    createModalTitle,
    createModalFields,
    editModalTitle,
    editModalFields,
    searchPlaceHolder,
    baseUrl,
} : SgaTableProps) {
    const [creationModalOpened, { open: openCreationModal, close: closeCreationModal }] = useDisclosure(false);
    const [deletingRecord, setDeletingRecord] = useState<SgaRecord | null>(null);
    const [editingRecord, setEditingRecord] = useState<SgaRecord | null>(null);

    const [selection, setSelection] = useState<number[]>([]);

    const [searchText, setSearchText] = useState<string>('');

    const [queryParams, setQueryParams] = useState<QueryParams>({
        pageNumber: 1,
        pageSize: 5,
        sortColumn: 'id',
        sortOrder: 'desc',
        searchTerm: ''
    });

    const { apiGet, apiPut, apiPost, apiDelete } = useApi();

    const [data, setData] = useState<PaginatedResult>({
        total: 0,
        records: [],
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchData = useCallback(async () => {
        const { pageNumber, pageSize, sortColumn, sortOrder, searchTerm } = queryParams;
        await apiGet(`${baseUrl}?page_number=${pageNumber}&page_size=${pageSize}&sort_by=${sortColumn}&sort_order=${sortOrder}&search=${searchTerm}`)
            .then((res) => {
                const records = res.items.map((item: SgaRecord) => {
                    return columns.reduce((res, column) => {
                        if (column.toValue) {
                            res[column.field] = column.toValue(res[column.field]);
                        }
                        return res;
                    }, {...item});
                });
                setData({
                    total: res.total_count,
                    records: records,
                });
            })
            .catch((error) => {
                setError((error as ApiError).message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [apiGet, queryParams, baseUrl, columns]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // when search filter changes, we need to reset the page number to 1
    // otherwise it may show empty if filtered result only have less data then current page.
    const handleSearchButtonClick = useCallback(() => {
        setQueryParams((previous) => ({
            ...previous,
            searchTerm: searchText.trim(),
            pageNumber: 1
        }));
    }, [searchText]);

    const handleSearchInputKeyDown = useCallback((event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleSearchButtonClick();
        }
    }, [handleSearchButtonClick]);

    const handlePageChange = useCallback((pageNumber: number) => {
        setQueryParams((previous) => ({
            ...previous,
            pageNumber: pageNumber,
        }));
    }, []);

    const handleSortChange = useCallback((column: string) => {
        setQueryParams((previous) => ({
            ...previous, 
            sortColumn: column,
            sortOrder: previous.sortColumn === column ? (previous.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'})
        );
    }, []);

    const toggleRow = useCallback((id: number) => {
        setSelection((current) => {
            return current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id];
        });
    }, []);

    const toggleAll = useCallback(() => {
        setSelection((current) => {
            return current.length === data.records.length
                ? []
                : data.records.map((record) => record.id);
        });
    }, [data.records]);

    const handleCreate = useCallback(
        async (record: SgaRecordCreate) => {
            try {
                await apiPost(baseUrl, record);
                closeCreationModal();
                await fetchData();
                showExcellent({
                    message: `The record has been created successfully.`
                });
            } catch (error) {
                showOops({ error: error as ApiError });
            }
        },
        [baseUrl, apiPost, fetchData, closeCreationModal]
    );

    const handleDelete = useCallback(async () => {
        if (!deletingRecord) {
            return;
        }

        try {
            await apiDelete(`${baseUrl}/${deletingRecord.id}`);
            setDeletingRecord(null);
            await fetchData();
            showExcellent({
                message: `The record has been deleted successfully.`
            });
        } catch (error) {
            showOops({ error: error as ApiError });
        }
    }, [baseUrl, apiDelete, fetchData, deletingRecord]);

    const handleUpdate = useCallback(
        async (record: SgaRecordUpdate) => {
            try {
                await apiPut(
                    `${baseUrl}/${record.id}`,
                    record
                );
                setEditingRecord(null);
                await fetchData();
                showExcellent({
                    message: `The record has been updated successfully.`
                });
            } catch (error) {
                showOops({ error: error as ApiError });
            }
        },
        [baseUrl, apiPut, fetchData]
    );

    const rows = useMemo(() => {
        return data.records.map((record) => {
            const selected = selection.includes(record.id);
            return (
                <Table.Tr
                    key={record.id}
                    className={cx({ [classes.rowSelected]: selected })}
                >
                    <Table.Td>
                        <Checkbox
                            checked={selection.includes(record.id)}
                            onChange={() => toggleRow(record.id)}
                        />
                    </Table.Td>
                    {columns.map(column => {
                        let value = record[column.field];
                        if (column.format) {
                            value = column.format(value);
                        } else if (column.type === 'boolean') {
                            value = value ? 'YES' : 'NO';
                        }
                        return (
                            <Table.Td key={column.field} align='center'>{value}</Table.Td>
                        )
                    })}
                    <Table.Td>
                        <Group gap={0} justify="flex-end">
                            <ActionIcon color="gray" variant="transparent">
                                <IconPencil
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                    onClick={() => setEditingRecord(record)}
                                />
                            </ActionIcon>
                            <ActionIcon color="red" variant="transparent">
                                <IconTrash
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                    onClick={() => setDeletingRecord(record)}
                                />
                            </ActionIcon>
                        </Group>
                    </Table.Td>
                </Table.Tr>
            );
        });
    }, [selection, data.records, columns]);

    if (loading) {
        return <Loading visible={loading} />;
    }

    return (
        <>
            {error && <ErrorAlert error={error} />}
            {creationModalOpened && (
                <CreateEditModal
                    title={createModalTitle ?? "Create New Record"}
                    opened={creationModalOpened}
                    onClose={closeCreationModal}
                    onSubmit={handleCreate}
                    fields={createModalFields}
                />
            )}
            {editingRecord && (
                <CreateEditModal
                    title={editModalTitle ?? "Edit Record"}
                    selected={editingRecord}
                    opened={!!editingRecord}
                    onClose={() => setEditingRecord(null)}
                    onSubmit={handleUpdate}
                    fields={editModalFields}                
                />
            )}
            {deletingRecord && (
                <DeleteModal
                    opened={deletingRecord !== null}
                    onClose={() => {
                        setDeletingRecord(null);
                    }}
                    onDelete={handleDelete}
                />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', minWidth: '500px'}}>
                <Button
                    leftSection={<IconEdit size={14} />}
                    variant="default"
                    onClick={() => {
                        openCreationModal();
                    }}
                >
                    {createModalTitle ?? "Create New Record"}
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '500px' }}>
                    <TextInput
                        placeholder={searchPlaceHolder ?? "Search" }
                        value={searchText}
                        onChange={(event) => setSearchText(event.currentTarget.value)}
                        style={{ flex: 1, marginRight: '0.5rem' }}
                        onKeyDown={handleSearchInputKeyDown}
                        leftSection={<IconSearch size={14} />}
                        rightSection={
                            <CloseButton
                                aria-label="Clear input"
                                onClick={() => setSearchText('')}
                                style={{ display: searchText ? undefined : 'none' }}
                            />
                        }
                    />
                    <Button
                        variant="default"
                        onClick={handleSearchButtonClick}
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
                                checked={selection.length === data.records.length}
                                indeterminate={
                                    selection.length > 0 &&
                                    selection.length !== data.records.length
                                }
                            />
                        </Table.Th>
                        {columns.map(column => {
                            return (
                                <Table.Th key={column.field}>
                                    <Button
                                        variant="subtle"
                                        onClick={() => handleSortChange(column.field)}
                                        style={{ width: '100%', textAlign: 'center' }}
                                    >
                                        {column.label} {queryParams.sortColumn === column.field && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                                    </Button>
                                </Table.Th>
                            );
                        })}
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <Pagination
                total={Math.ceil(data.total / queryParams.pageSize)}
                siblings={1}
                value={queryParams.pageNumber}
                mt="lg"
                onChange={handlePageChange}
            />
        </>
    );
}
