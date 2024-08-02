export enum Role {
  General = "General",
  Admin = "Admin",
  Mentor = "Mentor",
  Volunteer = "Volunteer",
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}