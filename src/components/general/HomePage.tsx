import { Center, Container, Divider, Grid, Text } from "@mantine/core";
import { SGAEventCard } from "./SGAEventCard";
import { useState, useEffect, useMemo } from "react";
import { SGAEvent } from "../../api/schemas";
import useApi from "../../hooks/useApi";
import { toDateValue } from "../shared/dateUtils";
import Loading from "../shared/Loading";
import { showOops } from "../shared/notification";


export function HomePage() {

    const { apiGet } = useApi();

    const [sgaEvents, setSgaEvents] = useState<SGAEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        apiGet("/api/events")
            .then((res: any[]) => {
                setSgaEvents(res.map(x => ({
                    ...x,
                    start_date_time: toDateValue(x.start_date_time),
                    end_date_time: toDateValue(x.end_date_time),
                })));
            })
            .catch((error) => {
                showOops({error: error});
            })
            .finally(() => {
                setLoading(false);
            });
    }, [apiGet]);

    const eventsColumns = useMemo(() => {
        return sgaEvents.map((x) => {
            return (
                <Grid.Col span={{ md: 4, sm: 6, xs: 12 }} key={x.id}>
                    <Center>
                        <SGAEventCard sgaEvent={x} />
                    </Center>
                </Grid.Col>
            );
        });
    }, [sgaEvents]);

    if (loading) {
        return <Loading visible={loading} />;
    }

    return (
        <Container fluid>
            <Text fw={600} size="lg">
                Events
            </Text>
            <Divider mb="md" mt="xs" />
            <Grid justify="center" align="stretch">
                {eventsColumns}
            </Grid>
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
