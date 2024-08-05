import { Divider, Image, Text } from "@mantine/core";

import sga_wechat_image from "./assets/SGA_wechat_group.webp";

export function AboutUs() {
    return (
        <>
            <Text size="lg" fw={600}>
                Who We Are
            </Text>
            <Text size="md" fw={300}>
                We are a collective group of families who sincerely share
                information, advice and insights to grow the better tomorrows.
            </Text>

            <Text size="lg" fw={600} mt="lg">
                Our Mission & Vision
            </Text>
            <Text size="md" fw={300}>
                To inspire our next generations by building a healthier
                community together. Our vision is to obtain and organize the
                information useful for our children and make it universally
                accessible.
            </Text>

            <Text size="lg" fw={600} mt="lg">
                Connect with Us
            </Text>
            <Image src={sga_wechat_image} h={200} w="auto" fit="contain" />
        </>
    );
}
