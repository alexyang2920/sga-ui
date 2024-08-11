import { Container, Divider, Text } from "@mantine/core";
import { EventGrid } from "./EventGrid";
import { useState, useEffect } from "react";
import { SGAEvent } from "../../../api/schemas";
import useApi from "../../../hooks/useApi";
import { toDateValue } from "../../shared/dateUtils";
import Loading from "../../shared/Loading";
import { showOops } from "../../shared/notification";

export function Home() {
    const { apiGet } = useApi();

    const [sgaEvents, setSgaEvents] = useState<SGAEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        apiGet("/api/events")
            .then((res: any[]) => {
                setSgaEvents(
                    res.map((x) => ({
                        ...x,
                        start_date_time: toDateValue(x.start_date_time),
                        end_date_time: toDateValue(x.end_date_time)
                    }))
                );
            })
            .catch((error) => {
                showOops({ error: error });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [apiGet]);

    if (loading) {
        return <Loading visible={loading} />;
    }

    return (
        <Container
            fluid
            w="100%"
            style={{
                paddingLeft: "0px",
                paddingRight: "0px"
            }}
        >
            <Text fw={600} size="lg">
                Events
            </Text>

            <Divider mb="md" mt="xs" />

            <EventGrid sgaEvents={sgaEvents} />

            <Text fw={600} size="lg" mt={40}>
                About Us
            </Text>

            <Text size="md" fw={300}>
                We are a collective group of families who sincerely share
                information, advice and insights to grow the better tomorrows.
            </Text>
        </Container>
    );
}
