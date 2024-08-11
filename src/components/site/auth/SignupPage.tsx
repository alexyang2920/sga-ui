import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Checkbox,
    Anchor,
    Stack,
    Notification,
    rem
} from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { signup } from "../../../api/auth";
import { useCallback, useState } from "react";
import { ApiError } from "../../../api/schemas";

function SignupForm() {
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
                val.length < 8
                    ? "Password should include at least 8 characters"
                    : null
        }
    });

    const handleSubmit = useCallback(async () => {
        setSuccess(false);
        setError(null);
        setLoading(true);
        try {
            await signup(form.values);
            setSuccess(true);
        } catch (error) {
            setError((error as ApiError).message ?? "");
        } finally {
            setLoading(false);
        }
    }, [form.values]);

    const handleRedirect = useCallback(() => {
        navigate("/login", { replace: true });
    }, [navigate]);

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

    return (
        <Paper radius="md" p="xl" withBorder>
            <Text size="lg" fw={500} style={{ paddingBottom: "20px" }}>
                Sign up
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        required
                        label="Name"
                        placeholder="Your name"
                        value={form.values.name}
                        onChange={(event) =>
                            form.setFieldValue(
                                "name",
                                event.currentTarget.value
                            )
                        }
                        radius="md"
                    />

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
                            "Password should include at least 8 characters"
                        }
                        radius="md"
                    />

                    <Checkbox
                        required
                        label="I accept terms and conditions"
                        checked={form.values.terms}
                        onChange={(event) =>
                            form.setFieldValue(
                                "terms",
                                event.currentTarget.checked
                            )
                        }
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
                        Have an account? Login
                    </Anchor>
                    <Button type="submit" radius="xl" loading={loading}>
                        Sign up
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
                {success && (
                    <Notification
                        title="Success"
                        icon={checkIcon}
                        color="teal"
                        onClose={() => setSuccess(false)}
                    >
                        You have successfully signed up.
                    </Notification>
                )}
            </form>
        </Paper>
    );
}

export function SignupPage() {
    return <SignupForm />;
}
