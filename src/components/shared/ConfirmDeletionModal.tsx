import { Modal, Group, Button, Text, } from "@mantine/core";

interface ConfirmDeletionModalProps {
    opened: boolean;
    close: () => void;
    handleDelete: () => void;
}

export function ConfirmDeletionModal({opened, close, handleDelete} : ConfirmDeletionModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Confirm Deletion"
        >
            <Text>Are you sure you want to delete this item?</Text>
            <Group mt="md">
                <Button onClick={close} variant="outline">Cancel</Button>
                <Button color="red" onClick={handleDelete}>Delete</Button>
            </Group>
        </Modal>
    )
}