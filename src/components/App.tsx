import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import useAuth from "../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import Loading from "./shared/Loading";
import { Site } from "./site/Site";
import { useEffect } from "react";

export default function App() {
    const { isLoading } = useAuth();

    const location = useLocation();

    useEffect(() => {
      // Reset scroll position to top on route change
      window.scrollTo(0, 0);
    }, [location]);

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
