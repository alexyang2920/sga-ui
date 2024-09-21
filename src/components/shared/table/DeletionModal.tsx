import { Modal, Group, Button, Text } from "@mantine/core";

interface DeletionModalProps {
    opened: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export function DeletionModal({
    opened,
    onClose,
    onDelete,
}: DeletionModalProps) {
    return (
        <Modal opened={opened} onClose={onClose} title="Confirm Deletion">
            <Text>Are you sure you want to delete this record?</Text>
            <Group mt="md">
                <Button onClick={onClose} variant="outline">
                    Cancel
                </Button>
                <Button color="red" onClick={onDelete}>
                    Delete
                </Button>
            </Group>
        </Modal>
    );
}
