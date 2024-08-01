
import { Center, Container, Grid } from "@mantine/core";
import { SGAEventCard, SGAEvent } from "./SGAEventCard";

const sgaEvents = [
    {
        id: 1,
        title: 'Mountains at night: 12 best locations to enjoy the view',
        date: 'September 12, 2022',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
    },
    {
        id: 2,
        title: 'Mountains at night: 12 best locations to enjoy the view',
        date: 'September 12, 2022',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
    },
    {
        id: 3,
        title: 'Mountains at night: 12 best locations to enjoy the view',
        date: 'September 12, 2022',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
    },
    {
        id: 4,
        title: 'Mountains at night: 12 best locations to enjoy the view',
        date: 'September 12, 2022',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
    },
    {
        id: 5,
        title: 'Mountains at night: 12 best locations to enjoy the view',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
    },
    {
        id: 6,
        title: 'Mountains at night: 12 best locations to enjoy the view',
        date: 'September 12, 2022',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
    },
    {
        id: 7,
        title: 'Mountains at night: 12 best locations to enjoy the view',
        date: 'September 12, 2022',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
    },
    {
        id: 8,
        title: 'Mountains at night: 12 best locations to enjoy the view',
        date: 'September 12, 2022',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
    }
] as SGAEvent[];

export function HomePage() {
    const eventsColumns = sgaEvents.map(x => {
        return (
            <Grid.Col span={{md: 4, sm: 6, xs: 12}} key={x.id}>
                <Center><SGAEventCard sgaEvent={x}/></Center>
            </Grid.Col>
        );
    });
    return (
        <Container fluid>
            <Grid justify="center" align="stretch">
                {eventsColumns}
            </Grid>
        </Container>
    );
}