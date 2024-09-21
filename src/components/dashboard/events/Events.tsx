import { Text } from "@mantine/core";
import { toDateString, toDateValue } from "../../shared/dateUtils";
import { ColumnDef, FieldDef, SgaTable } from '../../shared/table/SgaTable';


const columns = [
    { label: 'ID', field: 'id', type: 'number' },
    { label: 'Title', field: 'title', type: 'string' },
    { label: 'Location', field: 'location', type: 'string' },
    { label: 'Start Date Time', field: 'start_date_time', type: 'date', toValue: toDateValue, format: toDateString},
    { label: 'End Date Time', field: 'end_date_time', type: 'date', toValue: toDateValue, format: toDateString},
] as ColumnDef[];


const createModalFields = [
    { label: 'Title', name: 'title', type: 'string' },
    { label: 'Image URL', name: 'image', type: 'string' },
    { label: 'Location', name: 'location', type: 'string' },
    { label: 'Start Date Time', name: 'start_date_time', type: 'date' },
    { label: 'End Date Time', name: 'end_date_time', type: 'date' },
    { label: 'Content', name: 'content', type: 'richtext' },
] as FieldDef[];


const editModalFields = [
    { label: 'Title', name: 'title', type: 'string' },
    { label: 'Location', name: 'location', type: 'string' },
    { label: 'Image URL', name: 'image', type: 'string' },
    { label: 'Start Date Time', name: 'start_date_time', type: 'date'},
    { label: 'End Date Time', name: 'end_date_time', type: 'date' },
    { label: 'Content', name: 'content', type: 'richtext' },
] as FieldDef[];


export function DashboardEvents() {
    return (
        <>
            <Text fw={600} pb={"md"}>
                Events
            </Text>
            <SgaTable
                baseUrl='/api/events'
                columns={columns}
                searchPlaceHolder='Search by title'
                createModalTitle='Create New Event'
                createModalFields={createModalFields}
                editModalTitle='Edit Event'
                editModalFields={editModalFields}
            />
        </>
    );
}
