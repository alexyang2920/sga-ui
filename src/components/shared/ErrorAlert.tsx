import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface ErrorAlertProps {
    error: string;
}

export function ErrorAlert({error} : ErrorAlertProps) {
    return (
        <Alert variant="light" color="red" title="Alert title" icon={<IconInfoCircle />}>
            {error}
        </Alert>
    );
}