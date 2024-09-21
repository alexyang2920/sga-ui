import { Button, Checkbox, Group, Modal, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import { SgaRecord, SgaRecordUpdate } from './interfaces';
import { FieldDef } from './SgaTable';


interface EditModalProps {
    title: string;
    selected?: SgaRecord;
    fields: FieldDef[];
    onClose: () => void;
    onSubmit: (record: SgaRecord) => void;
}

/**
 * Always remember to destroy this modal when not showing,
 * such that the editor can be recreated,
 * otherwise no way to clear the old text in the editor.
 */
export function EditModal({
    title,
    onClose,
    onSubmit,
    fields,
    selected,
}: EditModalProps) {
    const [record, setRecord] = useState<SgaRecordUpdate>({...selected});

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
            opened={!!selected}
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
