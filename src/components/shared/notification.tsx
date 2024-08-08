import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import type { ApiError } from "../../api/schemas";

interface ExcellentProps {
    message: string;
}

export function showExcellent({message}: ExcellentProps) {
    notifications.show({
        title: "Success!",
        message: message,
        color: "green",
        icon: <IconCheck size={16} />,
        autoClose: 5000
    });
}

interface OopsProps {
    error: string | ApiError;
}

export function showOops({error}: OopsProps) {
    notifications.show({
        title: "Error!",
        message: (typeof error === 'string') ? error : (error as ApiError).message ?? 'Unknown error',
        color: "red",
        icon: <IconX size={16} />,
        autoClose: 5000
    });
}