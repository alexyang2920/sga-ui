import { Group, Text, Image, Title } from "@mantine/core";
import { ApiError, SGAEvent } from "../../../api/schemas";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";

import { formatTimeRange, toDateValue } from "../../shared/dateUtils";
import Loading from "../../shared/Loading";
import { NotFound } from "../../shared/NotFound";
import { ErrorAlert } from "../../shared/ErrorAlert";
import { RichTextDisplay } from "../../shared/RichTextDisplay";

export function EventPage() {
    const { apiGet } = useApi();
    const { id: eventId } = useParams<{ id: string }>();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [sgaEvent, setSgaEvent] = useState<SGAEvent | null>(null);

    useEffect(() => {
        if (!eventId) {
            return;
        }

        apiGet(`/api/events/${eventId}`)
            .then((event: any) => {
                setSgaEvent({
                    ...event,
                    start_date_time: toDateValue(event?.start_date_time),
                    end_date_time: toDateValue(event?.end_date_time)
                });
            })
            .catch((error) => {
                setError((error as ApiError).message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [eventId]);

    if (loading) {
        return <Loading visible={loading} />;
    }

    if (!sgaEvent) {
        return <NotFound />;
    }

    return (
        <>
            {error && <ErrorAlert error={error} />}

            <Title fw={600} order={1} mb="lg">
                {sgaEvent.title}
            </Title>

            <RichTextDisplay content={sgaEvent.content} />

            <Group>
                <Text fw={600}>Time:</Text>
                <Text>
                    {formatTimeRange(sgaEvent.start_date_time, sgaEvent.end_date_time)}
                </Text>
            </Group>

            {sgaEvent.location && (
                <Group mb="md">
                    <Text fw={600}>Location:</Text>
                    <Text>{sgaEvent.location}</Text>
                </Group>
            )}

            {sgaEvent.image && <Image mt="md" src={sgaEvent.image} />}
        </>
    );
}
