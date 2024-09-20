import cx from "clsx";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Checkbox, Group, Text, rem, ActionIcon } from "@mantine/core";
import classes from "./Users.module.css";
import { ApiError, EditUser, User } from "../../../api/schemas";
import useApi from "../../../hooks/useApi";
import { ErrorAlert } from "../../shared/ErrorAlert";
import Loading from "../../shared/Loading";
import { UserModal } from './UserModal';
import { showExcellent, showOops } from '../../shared/notification';
import { IconPencil } from '@tabler/icons-react';

export function DashboardUsers() {
    const [selection, setSelection] = useState<number[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { apiGet, apiPut } = useApi();

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<User[]>([]);
    const [error, setError] = useState<string>("");

    const fetchData = useCallback(() => {
        apiGet("/api/users")
            .then((res) => {
                setData(res);
            })
            .catch((error) => {
                setError((error as ApiError).message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [apiGet]);

    useEffect(() => {
        fetchData();
    }, [apiGet]);

    const toggleRow = useCallback((id: number) => {
        setSelection((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    }, []);

    const toggleAll = useCallback(() => {
        setSelection((current) =>
            current.length === data.length ? [] : data.map((item) => item.id)
        );
    }, []);

    const handleEdit = useCallback(
        async (editUser: EditUser) => {
            if (!editingUser) {
                return;
            }

            const payload = {
                ...editUser
            };

            try {
                const user = await apiPut(
                    `/api/users/${editingUser.id}`,
                    payload
                );
                setEditingUser(null);
                setData((current) => (current.map((x) => {
                        return x.id === user.id
                            ? {
                                ...user,
                            }
                            : x;
                    })
                ));
                showExcellent({
                    message: `The user ${user.name} has been updated successfully.`
                });
            } catch (error) {
                showOops({ error: error as ApiError });
            }
        },
        [apiPut, editingUser]
    );

    const rows = useMemo(
        () =>
            data.map((item) => {
                const selected = selection.includes(item.id);
                const roleNames = item.roles.map((x) => x.name).join(",");
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
                            <Group gap="sm">
                                <Text size="sm" fw={500}>
                                    {item.name}
                                </Text>
                            </Group>
                        </Table.Td>
                        <Table.Td>{item.email}</Table.Td>
                        <Table.Td>{roleNames}</Table.Td>
                        <Table.Td>{item.is_active ? 'YES' : 'NO'}</Table.Td>
                        <Table.Td>
                            <ActionIcon color="gray" variant="transparent">
                                <IconPencil
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                    onClick={() => setEditingUser(item)}
                                />
                            </ActionIcon>
                        </Table.Td>
                    </Table.Tr>
                );
            }),
        [data, selection]
    );

    if (loading) {
        return <Loading visible={loading} />;
    }

    return (
        <>
            <Text fw={600} pb={"md"}>
                Users
            </Text>
            {error && <ErrorAlert error={error} />}
            {editingUser && (
                <UserModal
                    opened={editingUser != null}
                    close={() => setEditingUser(null)}
                    user={editingUser}
                    onSubmit={handleEdit}
                />
            )}
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
                        <Table.Th>User</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>Enabled</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}
