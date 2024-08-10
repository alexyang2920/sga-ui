import React, {
    useState,
    ReactNode,
    createContext,
    useCallback,
    useMemo,
    useEffect
} from "react";
import { RoleEnum, User } from "../api/schemas";
import { fetchMe } from "../api/auth";
import useApi from "../hooks/useApi";

export interface AuthContextType {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    hasRole: (roleName: RoleEnum) => boolean;
    setUser: (user: User | null) => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    hasRole: () => false,
    setUser: () => {},
    isLoading: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

const AUTH_KEY = "authToken";

function getAccessToken(): string | null {
    let token = localStorage.getItem(AUTH_KEY);
    if (token !== null) {
        token = token.trim();
        token = token === "" ? null : token;
    }
    return token;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { apiGet } = useApi();

    const [token, setToken] = useState<string | null>(getAccessToken());
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = useCallback((token: string) => {
        localStorage.setItem(AUTH_KEY, token);
        setToken(token);
    }, []);

    const logout = useCallback(() => {
        localStorage.setItem(AUTH_KEY, "");
        setToken(null);
        setUser(null);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        if (token !== null) {
            const fetchUser = async () => {
                try {
                    const user = await fetchMe(token);
                    setUser(user);
                } catch (error) {
                    logout();
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const roleNames = useMemo(() => {
        return user ? new Set(user.roles.map((x) => x.name)) : new Set();
    }, [user?.roles]);

    const hasRole = useCallback(
        (roleName: RoleEnum) => {
            return roleNames.has(roleName);
        },
        [roleNames]
    );

    const isAuthenticated = token !== null;

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                login,
                logout,
                hasRole,
                setUser,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
