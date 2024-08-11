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

export interface ApiErrorDetail {
    field: string;
    message: string;
}

export interface ApiError {
    message: string;
    status: number;
    detail?: ApiErrorDetail[];
}

export enum RoleEnum {
    Admin = "Admin",
    User = "User",
    Mentor = "Mentor",
    Volunteer = "Volunteer"
}

export interface SGAEvent {
    id: number;
    title: string;
    location: string;
    content: string;
    image: string | null;
    start_date_time: Date | null;
    end_date_time: Date | null;
}

export type SGAEventCreate = Omit<SGAEvent, "id">;
