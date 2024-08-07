import { Button, Group, Modal, TextInput } from '@mantine/core';
import { ContentEditor } from './ContentEditor';

interface EventModalProps {
    title: string;
    close: () => void;
    opened: boolean;
    onSubmit: () => void;
}

export function EventModal({ title, close, opened, onSubmit }: EventModalProps) {

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={title}
                closeOnClickOutside={false}
                fullScreen={true}
                centered
            >
                <TextInput label="Title" placeholder="" />

                <TextInput
                    label="Location"
                    placeholder=""
                    mt="md"
                />

                <TextInput
                    label="Image URL"
                    placeholder=""
                    mt="md"
                />

                <TextInput
                    label="Start Date Time"
                    placeholder=""
                    mt="md"
                />


                <TextInput
                    label="End Date Time"
                    placeholder=""
                    mt="md"
                />

                <ContentEditor label="Content" />

                <Group mt="md">
                    <Button variant='default' onClick={onSubmit}>
                        Save</Button>
                    <Button variant='default' onClick={close}>
                        Cancel
                    </Button>
                </Group>
            </Modal>
        </>
    );
}