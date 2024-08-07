import { useEffect, useState, useMemo } from "react";
import { Table, Text } from "@mantine/core";
import { ApiError, Role } from "../../../api/schemas";
import useApi from "../../../hooks/useApi";
import { ErrorAlert } from "../../shared/ErrorAlert";
import Loading from "../../shared/Loading";

export function DashboardRoles() {
    const { apiGet } = useApi();

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Role[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        apiGet("/api/roles")
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

    const rows = useMemo(() => {
        return data.map((item) => {
            return (
                <Table.Tr key={item.id} >
                    <Table.Td>{item.id}</Table.Td>
                    <Table.Td>{item.name}</Table.Td>
                </Table.Tr>
            );
        });
    }, [data]);

    if (loading) {
        return <Loading visible={loading} />;
    }

    return (
        <>
            <Text fw={600} pb={"md"}>Roles</Text>
            {error && <ErrorAlert error={error} />}
            <Table miw={800} verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Name</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}
