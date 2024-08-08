import { Button, Group, Modal, TextInput } from '@mantine/core';
import { ContentEditor } from './ContentEditor';
import type { SGAEventCreate, SGAEvent } from '../../../api/schemas';
import { useCallback, useState } from 'react';
import { DateTimePicker } from '@mantine/dates';

interface EventModalProps {
    title: string;
    selectedEvent?: SGAEvent | null;
    close: () => void;
    opened: boolean;
    onSubmit: (sgaEvent: SGAEventCreate) => void;
}

function initValues(event?: SGAEvent | null): SGAEventCreate {
    if (event) {
        return {...event};
    }
    return {
        title: '',
        content: '',
        image: '',
        location: '',
        start_date_time: null,
        end_date_time: null,
    };
}

/**
 * Always remember to destroy this modal when not showing,
 * such that the editor can be recreated,
 * otherwise no way to clear the old text in the editor.
 */
export function EventModal({ title, close, opened, onSubmit, selectedEvent }: EventModalProps) {
    const [sgaEvent, setSgaEvent] = useState<SGAEventCreate>(initValues(selectedEvent));

    const handleInputChange = useCallback((field: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setSgaEvent((previous) => ({ ...previous, [field]: event.target.value }));
        };
    }, []);

    const handleDateChange = useCallback((field: string) => {
        return (value: Date | null) => {
            setSgaEvent((previous) => ({ ...previous, [field]: value }));
        };
    }, []);

    const handleContentUpdate = useCallback((content: string) => {
        setSgaEvent((previous) => ({ ...previous, content: content }));
    }, []);

    const handleSubmit = useCallback(() => {
        onSubmit(sgaEvent);
    }, [onSubmit, sgaEvent]);

    const handleClose = useCallback(() => {
        close();
        setSgaEvent(initValues());
    }, [close]);

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={title}
            closeOnClickOutside={false}
            centered
        >
            <TextInput
                label="Title"
                placeholder=""
                value={sgaEvent.title}
                onChange={handleInputChange('title')}
            />

            <TextInput
                label="Location"
                placeholder=""
                value={sgaEvent.location}
                onChange={handleInputChange('location')}
                mt="md"
            />

            <TextInput
                label="Image URL"
                placeholder=""
                value={sgaEvent?.image ?? ''}
                onChange={handleInputChange('image')}
                mt="md"
            />

            <DateTimePicker
                label="Start Date Time"
                placeholder="Pick date and time"
                valueFormat='YYYY-MM-DD HH:mm:ss'
                value={sgaEvent?.start_date_time}
                onChange={handleDateChange('start_date_time')}
                mt="md"
            />

            <DateTimePicker
                label="End Date Time"
                placeholder="Pick date and time"
                valueFormat='YYYY-MM-DD HH:mm:ss'
                value={sgaEvent?.end_date_time}
                onChange={handleDateChange('end_date_time')}
                mt="md"
            />

            <ContentEditor
                label="Content"
                initContent={sgaEvent?.content}
                onContentUpdate={handleContentUpdate}
            />

            <Group mt="md">
                <Button variant='default' onClick={handleSubmit}>
                    Save
                </Button>
                <Button variant='default' onClick={handleClose}>
                    Cancel
                </Button>
            </Group>
        </Modal>
    );
}