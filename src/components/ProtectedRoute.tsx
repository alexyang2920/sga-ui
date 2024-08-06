import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RoleEnum } from "../api/schemas";

export const ProtectedRoute = () => {
    const { isAuthenticated, hasRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace />;
    }

    if (!hasRole(RoleEnum.Admin)) {
        return <Navigate to={"/"} replace />;
    }

    return <Outlet />;
};
