export interface Role {
    id: number;
    name: RoleEnum;
}

export interface User {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    roles: Role[];
}

export interface ApiError {
    message: string;
    status?: number;
}

export enum RoleEnum {
    Admin = "Admin",
    User = "User",
    Mentor = "Mentor",
    Volunteer = "Volunteer"
}
