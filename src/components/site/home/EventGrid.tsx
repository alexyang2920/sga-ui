import { useMemo } from "react";
import { Grid} from "@mantine/core";
import { SGAEvent } from "../../../api/schemas";
import { EventCard } from "./EventCard";


interface SGAEventGridProps {
    sgaEvents: SGAEvent[];
}


export function EventGrid({sgaEvents} : SGAEventGridProps) {

    const columns = useMemo(() => {
        return sgaEvents.map((x) => {
            return (
                <Grid.Col span={{ md: 4, sm: 6, xs: 12 }} key={x.id}>
                    <EventCard sgaEvent={x} />
                </Grid.Col>
            );
        });
    }, [sgaEvents]);

    return (
        <Grid justify="center" align="stretch" gutter="xl">
            {columns}
        </Grid>
    )
}
