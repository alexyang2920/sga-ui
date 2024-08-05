import { Box, Paper } from "@mantine/core";
import { DashboardNavBar } from "./DashboardNavBar";
import { Route, Routes } from "react-router-dom";
import { DashboardUsers } from "./users/Users";
import { DashboardEvents } from "./events/Events";
import { DashboardForm } from "./forms/Form";
import { DashboardForms } from "./forms/Forms";
import { DashboardHome } from "./DashboardHome";

export function Dashboard() {
    return (
        <Paper
            style={{
                display: "flex",
                flexDirection: "row",
                minWidth: "1200px"
            }}
        >
            <DashboardNavBar />
            <Box style={{ padding: "var(--mantine-spacing-md)" }}>
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/forms" element={<DashboardForms />} />
                    <Route path="/forms/:id" element={<DashboardForm />} />
                    <Route path="/events" element={<DashboardEvents />} />
                    <Route path="/users" element={<DashboardUsers />} />
                </Routes>
            </Box>
        </Paper>
    );
}
