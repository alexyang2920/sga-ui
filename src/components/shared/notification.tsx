import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import type { ApiError } from "../../api/schemas";

interface ExcellentProps {
    message: string;
}

export function showExcellent({ message }: ExcellentProps) {
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

export function showOops({ error }: OopsProps) {
    const msgs = [];
    if (typeof error === "string") {
        msgs.push(error);
    } else {
        const err = error as ApiError;
        if (err.detail?.length && err.detail.length > 0) {
            err.detail.forEach((x) => {
                msgs.push(`${x.field}: ${x.message}`);
            });
        } else {
            msgs.push(err.message);
        }
    }

    msgs.forEach((msg) => {
        notifications.show({
            title: "Error!",
            message: msg,
            color: "red",
            icon: <IconX size={16} />,
            autoClose: 5000
        });
    });
}
