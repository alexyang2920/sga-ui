// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, Container } from '@mantine/core';


import { AppHeader } from './Header';
import { AppFooter } from './Footer';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Your theme configuration is merged with default theme
const theme = createTheme({
});

export default function App() {
  return <MantineProvider theme={theme}>
    <Container fluid style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
        <Container style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage /> } />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      <AppFooter />
    </Container>
  </MantineProvider>;
}