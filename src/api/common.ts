import { ApiError } from "./schemas";

export async function apiFetch(
    url: string,
    method: string,
    headers: Record<string, any>,
    payload?: Record<string, any> | FormData
) {
    const options = {
        method: method,
        headers: headers
    } as RequestInit;

    if (payload) {
        options.body =
            payload instanceof FormData ? payload : JSON.stringify(payload);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw {
                message: error.message || "An error occurred",
                status: response.status
            };
        }

        return await response.json();
    } catch (error) {
        // Handle network errors or other unexpected issues
        throw {
            status: 500,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
        } as ApiError;
    }
}

export async function doGet(url: string) {
    const headers = {
        "Content-Type": "application/json"
    };
    return await apiFetch(url, "GET", headers);
}

export async function doPost(url: string, payload: Record<string, any>) {
    const headers = {
        "Content-Type": "application/json"
    };
    return await apiFetch(url, "POST", headers, payload);
}

export async function doFormPost(url: string, data: FormData) {
    return await apiFetch(url, "POST", {}, data);
}
