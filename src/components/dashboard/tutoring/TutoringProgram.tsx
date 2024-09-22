import { useParams } from 'react-router-dom';

export function DashboardTutoringProgram() {
    const { id } = useParams<{ id: string }>();
    const tutoringProgramId = Number(id);
    return (<div>{tutoringProgramId}</div>)
}