import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import Loading from "./shared/Loading";
import { Site } from "./site/Site";

export default function App() {
    const { token, logout, setUser } = useAuth();
    const { apiGet } = useApi();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token !== null) {
            const fetchUser = async () => {
                try {
                    const user = await apiGet("/api/users/me");
                    setUser(user);
                } catch (error) {
                    console.log(error);
                    logout();
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [token, logout, setUser]);

    if (isLoading) {
        return <Loading visible={isLoading} />;
    }

    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/Dashboard/*" element={<Dashboard />} />
            </Route>
            <Route path="/*" element={<Site />} />
        </Routes>
    );
}
