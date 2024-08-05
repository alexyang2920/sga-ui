import { doPost } from './common';

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    terms: boolean;
}

export async function signup(payload: SignupPayload) {
    return await doPost('/api/users', payload);
}