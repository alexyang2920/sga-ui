import { doPost } from "./common";

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    terms: boolean;
}

interface SigninPayload {
    email: string;
    password: string;
}

export async function signup(payload: SignupPayload) {
    return await doPost("/api/users", payload);
}

export async function signin(payload: SigninPayload) {
    const data = new FormData();
    data.append('username', payload.email);
    data.append('password', payload.password);

    const response = await fetch("/api/auth/token", {
        method: "POST",
        body: data
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return await response.json();
}
