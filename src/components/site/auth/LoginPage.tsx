import { Navigate, useNavigate } from "react-router-dom";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Anchor,
    Stack,
    Notification,
    rem
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { signin } from "../../../api/auth";
import useAuth from "../../../hooks/useAuth";
import { ApiError } from "../../../api/schemas";

function LoginForm() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleRedirect = useCallback(() => {
        navigate("/signup", { replace: true });
    }, [navigate]);

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setError(null);
            setLoading(true);
            try {
                const { access_token } = await signin(formData);
                login(access_token);
                notifications.show({
                    title: "Success!",
                    message: "You’ve logged in successfully.",
                    color: "green",
                    icon: <IconCheck size={16} />,
                    autoClose: 5000
                });
            } catch (error) {
                setError((error as ApiError).message ?? "");
            } finally {
                setLoading(false);
            }
        },
        [formData]
    );

    const handleChange =
        (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setFormData({
                ...formData,
                [field]: value
            });
        };

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

    if (isAuthenticated) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <Paper radius="md" p="xl" withBorder>
            <Text size="lg" fw={500} style={{ paddingBottom: "20px" }}>
                Login
            </Text>

            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@sharegrow.org"
                        value={formData.email}
                        onChange={handleChange("email")}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={formData.password}
                        onChange={handleChange("password")}
                        radius="md"
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={handleRedirect}
                        size="xs"
                    >
                        Don't have an account? Signup
                    </Anchor>
                    <Button type="submit" radius="xl" loading={loading}>
                        Login
                    </Button>
                </Group>

                {error && (
                    <Notification
                        icon={xIcon}
                        color="red"
                        title="Bummer!"
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Notification>
                )}
            </form>
        </Paper>
    );
}

export function LoginPage() {
    return <LoginForm />;
}
