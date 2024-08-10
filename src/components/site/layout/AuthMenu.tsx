import { Button } from "@mantine/core";
import useAuth from "../../../hooks/useAuth";
import { SiteAvater } from "./SiteAvater";

interface AuthMenuProps {
    handleNavigate: (link: string) => () => void,
    handleLogout: () => void;
    isMobile: boolean;
}


export function AuthMenu({ handleNavigate, handleLogout, isMobile }: AuthMenuProps) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        isMobile ?
            <Button variant="default" onClick={handleLogout} c="red">Log out</Button>
            : <SiteAvater handleLogout={handleLogout} handleNavigate={handleNavigate} />
    ) : (
        <>
            <Button variant="default" onClick={handleNavigate('/login')}>
                Log in
            </Button>
            <Button onClick={handleNavigate('/signup')}>Sign up</Button>
        </>
    );
}