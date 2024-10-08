import { Route, Routes } from "react-router-dom";
import { DashboardUsers } from "./users/Users";
import { DashboardEvents } from "./events/Events";
import { DashboardForm } from "./forms/Form";
import { DashboardForms } from "./forms/Forms";
import { DashboardHome } from "./DashboardHome";
import { DashboardRoles } from "./roles/Roles";
import { DashboardTutoringPrograms } from "./tutoring/TutoringPrograms";
import { NotFound } from "../shared/NotFound";
import { DashboardLayout } from "./layout/DashboardLayout";
import { DashboardTutoringProgram } from './tutoring/TutoringProgram';

export function Dashboard() {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/forms" element={<DashboardForms />} />
                <Route path="/forms/:id" element={<DashboardForm />} />
                <Route path="/events" element={<DashboardEvents />} />
                <Route path="/users" element={<DashboardUsers />} />
                <Route path="/roles" element={<DashboardRoles />} />
                <Route path="/tutoring" element={<DashboardTutoringPrograms />} />
                <Route path="/tutoring/:id" element={<DashboardTutoringProgram />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </DashboardLayout>
    );
}
