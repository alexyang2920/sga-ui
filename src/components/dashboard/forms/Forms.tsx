import { Anchor, Table, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { mockFormsData } from "./MockData";

export function DashboardForms() {
    const navigate = useNavigate();
    const handleClick = (id: number) => {
        navigate(`/dashboard/forms/${id}`);
    };

    const rows = mockFormsData.map((row) => {
        const totalQuestions = row.questions.length;

        return (
            <Table.Tr key={row.id}>
                <Table.Td>
                    <Anchor
                        component="button"
                        fz="sm"
                        onClick={() => handleClick(row.id)}
                    >
                        {row.id}
                    </Anchor>
                </Table.Td>
                <Table.Td>
                    <Anchor
                        component="button"
                        fz="sm"
                        onClick={() => handleClick(row.id)}
                    >
                        {row.title}
                    </Anchor>
                </Table.Td>
                <Table.Td>{row.description}</Table.Td>
                <Table.Td>
                    {Intl.NumberFormat().format(totalQuestions)}
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="xs">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Id</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Description</Table.Th>
                            <Table.Th>Questions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
}
