import { Button } from "@mantine/core";
import useAuth from "../../../hooks/useAuth";

interface AuthMenuProps {
    handleNavigate: (link: string) => () => void,
    handleLogout: () => void;
}


export function AuthMenu({ handleNavigate, handleLogout }: AuthMenuProps) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        <Button variant="default" onClick={handleLogout} c="red">
            Log out
        </Button>
    ) : (
        <>
            <Button variant="default" onClick={handleNavigate('/login')}>
                Log in
            </Button>
            <Button onClick={handleNavigate('/signup')}>Sign up</Button>
        </>
    );
}