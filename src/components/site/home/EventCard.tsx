import { Image, Text, Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SGAEvent } from "../../../api/schemas";
import classes from './EventCard.module.css';


const defaultImage = "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80";


export function EventCard(props: { sgaEvent: SGAEvent }) {
    const navigate = useNavigate();
    const { sgaEvent } = props;
    return (
        <Card
            shadow="sm"
            padding="md"
            className={classes.card}
        >
            <Card.Section style={{ cursor: 'pointer' }} onClick={() => navigate(`/events/${sgaEvent.id}`)}>
                <Image src={sgaEvent.image ?? defaultImage} className={classes.image} />
            </Card.Section>

            <Text fw={500} size="md" mt="md">
                {sgaEvent.title}
            </Text>
        </Card>
    );
}