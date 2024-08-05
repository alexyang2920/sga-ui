import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Anchor,
    Stack
} from "@mantine/core";

function LoginForm(props: PaperProps) {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/signup", { replace: true });
    };

    const form = useForm({
        initialValues: {
            email: "",
            name: "",
            password: "",
            terms: true
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val.length <= 6
                    ? "Password should include at least 6 characters"
                    : null
        }
    });

    return (
        <Paper
            radius="md"
            p="xl"
            withBorder
            {...props}
            style={{ maxWidth: "800px", minWidth: "400px" }}
        >
            <Text size="lg" fw={500} style={{ paddingBottom: "20px" }}>
                Login
            </Text>

            <form onSubmit={form.onSubmit(() => {})}>
                <Stack>
                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue(
                                "email",
                                event.currentTarget.value
                            )
                        }
                        error={form.errors.email && "Invalid email"}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue(
                                "password",
                                event.currentTarget.value
                            )
                        }
                        error={
                            form.errors.password &&
                            "Password should include at least 6 characters"
                        }
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
                    <Button type="submit" radius="xl">
                        Login
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}

export function LoginPage() {
    return <LoginForm />;
}
