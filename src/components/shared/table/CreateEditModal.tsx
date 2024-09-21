import { Button, Checkbox, Group, Modal, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import type { SgaRecord, SgaRecordCreate } from './interfaces';
import { FieldDef } from './SgaTable';
import { DateTimePicker } from '@mantine/dates';
import { ContentEditorWrapper } from './ContentEditor';


function initRecord(fields: FieldDef[], existingRecord?: SgaRecord) : SgaRecordCreate {
    if (existingRecord) {
        return {...existingRecord};
    }
    return fields.reduce((result, field) => {
        result[field.name] = field.type === 'boolean' ? false : '';
        return result;
    }, {} as SgaRecordCreate);
}


interface CreateEditModalProps {
    title: string;
    opened: boolean;
    fields: FieldDef[];
    selected?: SgaRecord;
    onClose: () => void;
    onSubmit: (record: SgaRecordCreate) => void;
}

/**
 * Always remember to destroy this modal when not showing,
 * such that the editor can be recreated,
 * otherwise no way to clear the old text in the editor.
 */
export function CreateEditModal({
    title,
    onClose,
    onSubmit,
    opened,
    fields,
    selected,
}: CreateEditModalProps) {
    const [record, setRecord] = useState<SgaRecordCreate>(initRecord(fields, selected));

    const handleSubmit = useCallback(() => {
        onSubmit(record);
    }, [onSubmit, record]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleInputChange = useCallback((field: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setRecord((previous) => ({
                ...previous,
                [field]: event.target.value
            }));
        };
    }, []);

    const handleBooleanChange = useCallback((field: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setRecord((previous) => ({
                ...previous,
                [field]: event.target.checked
            }));
        };
    }, []);

    const handleDateChange = useCallback((field: string) => {
        return (value: Date | null) => {
            setRecord((previous) => ({ ...previous, [field]: value }));
        };
    }, []);

    const handleRichTextUpdate = useCallback((field: string) => {
        return (content: string) => {
            setRecord((previous) => ({ ...previous, [field]: content }));
        };
    }, []);

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={title}
            closeOnClickOutside={false}
            centered
        >
            {
                fields.map(field => {
                    if (field.type === 'boolean') {
                        return (
                            <Checkbox
                                key={field.name}
                                label={field.label}
                                checked={!!record[field.name]}
                                onChange={handleBooleanChange(field.name)}
                                mt="md"
                            />
                        );
                    } else if (field.type === 'string') {
                        return (
                            <TextInput
                                key={field.name}
                                label={field.label}
                                value={record[field.name]}
                                onChange={handleInputChange(field.name)}
                            />
                        );
                    } else if (field.type === 'date') {
                        return (
                            <DateTimePicker
                                key={field.name}
                                label={field.label}
                                placeholder="Pick date and time"
                                valueFormat="YYYY-MM-DD HH:mm:ss"
                                value={record[field.name]}
                                onChange={handleDateChange(field.name)}
                                mt="md"
                            />
                        )
                    } else if (field.type === 'richtext') {
                        return (
                            <ContentEditorWrapper
                                key={field.name}
                                fieldName={field.name}
                                fieldLabel={field.label}
                                initContent={record[field.name] ?? ''}
                                onContentUpdate={handleRichTextUpdate}
                            />
                        );
                    }
                    else {
                        return (<div key={field.name} >Unknown</div>);
                    }
                })
            }
            <Group mt="md">
                <Button variant="default" onClick={handleSubmit}>
                    Save
                </Button>
                <Button variant="default" onClick={handleClose}>
                    Cancel
                </Button>
            </Group>
        </Modal>
    );
}
