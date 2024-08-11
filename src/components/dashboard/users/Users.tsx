import cx from "clsx";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Checkbox, Group, Text, rem } from "@mantine/core";
import classes from "./Users.module.css";
import { ApiError, User } from "../../../api/schemas";
import useApi from "../../../hooks/useApi";
import { ErrorAlert } from "../../shared/ErrorAlert";
import Loading from "../../shared/Loading";

export function DashboardUsers() {
    const [selection, setSelection] = useState<number[]>([]);

    const { apiGet } = useApi();

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<User[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
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
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}
