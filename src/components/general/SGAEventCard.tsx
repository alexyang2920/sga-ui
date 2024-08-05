import { Card, Image, Text } from "@mantine/core";

export interface SGAEvent {
    id: number;
    title: string;
    imageUrl: string;
    date: string;
}

export function SGAEventCard(props: { sgaEvent: SGAEvent }) {
    const { sgaEvent } = props;
    return (
        <Card
            shadow="sm"
            padding="xl"
            style={{ width: "300px" }}
            component="a"
            href={"/events/" + sgaEvent.id}
            target="_self"
        >
            <Card.Section>
                <Image src={sgaEvent.imageUrl} h={160} />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
                {sgaEvent.title}
            </Text>
        </Card>
    );
}
