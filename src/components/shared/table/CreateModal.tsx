import { Button, Checkbox, Group, Modal, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import type { SgaRecordCreate } from './interfaces';
import { FieldDef } from './SgaTable';


function initRecord(fields: FieldDef[]) : SgaRecordCreate {
    return fields.reduce((result, field) => {
        result[field.name] = field.type === 'boolean' ? false : '';
        return result;
    }, {} as SgaRecordCreate);
}


interface CreateModalProps {
    title: string;
    opened: boolean;
    fields: FieldDef[];
    onClose: () => void;
    onSubmit: (record: SgaRecordCreate) => void;
}

/**
 * Always remember to destroy this modal when not showing,
 * such that the editor can be recreated,
 * otherwise no way to clear the old text in the editor.
 */
export function CreateModal({
    title,
    onClose,
    onSubmit,
    opened,
    fields,
}: CreateModalProps) {
    const [record, setRecord] = useState<SgaRecordCreate>(initRecord(fields));

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
                    } else {
                        return (<div>Unknown</div>);
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
