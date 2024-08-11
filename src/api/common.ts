import type { ApiError } from "./schemas";

interface FetchProps {
    url: string;
    method: string;
    headers?: Record<string, any>;
    payload?: Record<string, any> | FormData;
}

export async function apiFetch({
    url,
    method,
    headers = {},
    payload
}: FetchProps) {
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
            switch(response.status) {
                case 500:
                    throw {
                        message: "Server not available",
                        status: 500,
                    };
                default:
                    const error = await response.json();
                    throw {
                        message: error?.detail || "An error occurred",
                        status: response.status
                    } as ApiError;
            }
        }

        if (response.status !== 204) {
            return await response.json();
        }
    } catch (error) {
        // Handle network errors or other unexpected issues
        throw {
            status: (error as any)?.status ?? 500,
            message: (error as any)?.message ?? "An unexpected error occurred",
        } as ApiError;
    }
}

export async function doGet(url: string) {
    const headers = {
        "Content-Type": "application/json"
    };
    return await apiFetch({
        url,
        method: "GET",
        headers
    });
}

export async function doPost(url: string, payload: Record<string, any>) {
    const headers = {
        "Content-Type": "application/json"
    };
    return await apiFetch({
        url,
        method: "POST",
        headers,
        payload
    });
}

export async function doFormPost(url: string, payload: FormData) {
    return await apiFetch({
        url,
        method: "POST",
        payload
    });
}
