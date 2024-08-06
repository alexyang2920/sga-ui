import useAuth from './useAuth';
import { apiFetch } from '../api/common';

const useApi = () => {
    const { token } = useAuth();

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const apiGet = async (url: string) => {
        return await apiFetch(url, 'GET', headers);
    };

    return { apiGet };
};

export default useApi;
