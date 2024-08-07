import { useCallback } from 'react';
import useAuth from "./useAuth";
import { apiFetch } from "../api/common";

const useApi = () => {
    const { token } = useAuth();

    const apiGet = useCallback(async (url: string) => {
        return await apiFetch(
            url,
            "GET",
            {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            });
    }, [token]);

    return { apiGet };
};

export default useApi;
