import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthProvider"; // adjust the import path as necessary

export default function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
