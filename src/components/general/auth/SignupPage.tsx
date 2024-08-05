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
    Checkbox,
    Anchor,
    Stack
} from "@mantine/core";

function SignupForm(props: PaperProps) {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/login", { replace: true });
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
                Sign up
            </Text>
            <form onSubmit={form.onSubmit(() => {})}>
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
                            "Password should include at least 6 characters"
                        }
                        radius="md"
                    />

                    <Checkbox
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
                    <Button type="submit" radius="xl">
                        Sign up
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}

export function SignupPage() {
    return <SignupForm />;
}
