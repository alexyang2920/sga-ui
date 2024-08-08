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

    const apiDelete = useCallback(async (url: string) => {
        return await apiFetch({
            url,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            }
        });
    }, [token]);


    return { apiGet, apiPost, apiDelete };
};

export default useApi;
