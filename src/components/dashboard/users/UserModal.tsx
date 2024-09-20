import { Button, Group, Modal, TextInput, Checkbox } from "@mantine/core";
import type { User, EditUser } from "../../../api/schemas";
import { useCallback, useState } from "react";

interface UserModalProps {
    user: User;
    opened: boolean;
    close: () => void;
    onSubmit: (editUser: EditUser) => void;
}


export function UserModal({
    close,
    opened,
    onSubmit,
    user
}: UserModalProps) {
    const [editingUser, setEditingUser] = useState<EditUser>(
        { ...user }
    );

    const handleInputChange = useCallback((field: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditingUser((previous) => ({
                ...previous,
                [field]: event.target.value
            }));
        };
    }, []);


    const handleSubmit = useCallback(() => {
        onSubmit(editingUser);
    }, [onSubmit, editingUser]);

    const handleClose = useCallback(() => {
        close();
    }, [close]);

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={"Edit User"}
            closeOnClickOutside={false}
            centered
        >

            <TextInput
                label="Email"
                placeholder=""
                value={user.email}
                readOnly={true}
            />

            <TextInput
                label="Name"
                placeholder=""
                value={editingUser.name}
                onChange={handleInputChange("name")}
                mt="md"
            />

            <Checkbox
                label="Enabled"
                checked={editingUser.is_active}
                onChange={(event) => setEditingUser((previous) => ({...previous, is_active: event.target.checked}))}
                mt="md"
                />

            <Group mt="lg">
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
