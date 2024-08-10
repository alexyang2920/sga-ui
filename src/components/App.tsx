import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import useAuth from "../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import Loading from "./shared/Loading";
import { Site } from "./site/Site";

export default function App() {
    const { isLoading } = useAuth();

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
