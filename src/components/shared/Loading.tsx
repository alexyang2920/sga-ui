import { LoadingOverlay } from "@mantine/core";

interface LoadingProps {
    visible: boolean;
}

const Loading = ({ visible }: LoadingProps) => {
    return (
        <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
        />
    );
};

export default Loading;
