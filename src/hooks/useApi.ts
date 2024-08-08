import { useCallback } from 'react';
import useAuth from "./useAuth";
import { apiFetch } from "../api/common";

const useApi = () => {
    const { token } = useAuth();

    const apiGet = useCallback(async (url: string) => {
        return await apiFetch({
            url,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            }
        });
    }, [token]);

    const apiPost = useCallback(async (url: string, payload: Record<string, any>) => {
        return await apiFetch({
            url,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            },
            payload,
        });
    }, [token]);

    return { apiGet, apiPost };
};

export default useApi;
