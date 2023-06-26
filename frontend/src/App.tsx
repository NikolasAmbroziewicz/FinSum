import { Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/dashboard/DashboardPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import NotFoundPage from './pages/404/NotFound';
import PrivateRoutes from './pages/utils/ProtectedRoutes';
import ProtectedAuthRoutes from './pages/utils/ProtectedAuthRotes';

import MonthFinance from './pages/MonthFinance/MonthFinance';
import StocksPage from './pages/stocks/StocksPage';
import CryptocurrencyPage from './pages/cryptocurrency/CryptocurrencyPage';
import MetalsPage from './pages/metals/MetalsPage';
import IncomePage from './pages/income/IncomePage';

import BaseNavLayout from './shared/layouts/BaseNavLayout';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedAuthRoutes />}>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route
          path="/dashboard"
          element={
            <BaseNavLayout>
              <DashboardPage />
            </BaseNavLayout>
          }
        />
        <Route
          path="/stock"
          element={
            <BaseNavLayout>
              <StocksPage />
            </BaseNavLayout>
          }
        />
        <Route
          path="/cryptocurrency"
          element={
            <BaseNavLayout>
              <CryptocurrencyPage />
            </BaseNavLayout>
          }
        />
        <Route
          path="/metals"
          element={
            <BaseNavLayout>
              <MetalsPage />
            </BaseNavLayout>
          }
        />
        <Route
          path="month-finance"
          element={
            <BaseNavLayout>
              <MonthFinance />
            </BaseNavLayout>
          }
        />
        <Route
          path="income"
          element={
            <BaseNavLayout>
              <IncomePage />
            </BaseNavLayout>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
