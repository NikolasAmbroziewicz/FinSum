import { Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/dashboard/DashboardPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import NotFoundPage from './pages/404/NotFound';
import PrivateRoutes from './pages/utils/ProtectedRoutes';
import ProtectedAuthRoutes from './pages/utils/ProtectedAuthRotes';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedAuthRoutes />}>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
