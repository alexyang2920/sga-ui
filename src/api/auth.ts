import { doPost, doFormPost, apiFetch } from "./common";

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
    data.append("username", payload.email);
    data.append("password", payload.password);
    return await doFormPost("/api/auth/token", data);
}

export async function fetchMe(token: string) {
    return await apiFetch({
        url: "/api/users/me",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        }
    });
}
