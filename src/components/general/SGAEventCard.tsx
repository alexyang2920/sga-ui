import { Card, Image, Text } from "@mantine/core";
import { SGAEvent } from "../../api/schemas";
import { useNavigate } from "react-router-dom";

const defaultImage = "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80";

export function SGAEventCard(props: { sgaEvent: SGAEvent }) {
    const navigate = useNavigate();
    const { sgaEvent } = props;
    return (
        <Card
            shadow="sm"
            padding="xl"
            style={{ width: "300px" }}
            component="a"
            onClick={() => navigate(`/events/${sgaEvent.id}`)}
        >
            <Card.Section>
                <Image src={sgaEvent.image ?? defaultImage} h={160} />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
                {sgaEvent.title}
            </Text>
        </Card>
    );
}
