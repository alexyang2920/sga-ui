import { Text, } from "@mantine/core";
import { SgaTable, ColumnDef, FieldDef } from '../../shared/table/SgaTable';


const columns = [
    { label: 'ID', field: 'id', type: 'number' },
    { label: 'Title', field: 'title', type: 'string' },
    { label: 'Enabled', field: 'is_active', type: 'boolean' }
] as ColumnDef[];


const createModalFields = [
    {
        label: 'Title', name: 'title', type: 'string'
    }, {
        label: 'Enabled', name: 'is_active', type: 'boolean'
    }
] as FieldDef[];

const editModalFields = [
    {
        label: 'Title', name: 'title', type: 'string'
    }, {
        label: 'Enabled', name: 'is_active', type: 'boolean'
    }
] as FieldDef[];

export function DashboardTutoringPrograms() {
    return (
        <>
            <Text fw={600} pb={"md"}>
                Tutoring Programs
            </Text>
            <SgaTable
                baseUrl='/api/tutoring-programs'
                columns={columns}
                searchPlaceHolder='Search by title'
                createModalTitle='Create New Tutoring Program'
                createModalFields={createModalFields}
                editModalTitle='Edit Tutoring Program'
                editModalFields={editModalFields}
            />
        </>
    );
}
