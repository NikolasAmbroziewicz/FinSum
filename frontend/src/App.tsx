import { Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/Dashboard/DashboardPage';

import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

import NotFoundPage from './pages/404/NotFound';
import PrivateRoutes from './pages/Utils/ProtectedRoutes';
import ProtectedAuthRoutes from './pages/Utils/ProtectedAuthRotes';

import MonthFinance from './pages/MonthFinance/MonthFinance';
import StocksPage from './pages/Stocks/StocksPage';
import CryptocurrencyPage from './pages/Cryptocurrency/CryptocurrencyPage';
import MetalsPage from './pages/Metals/MetalsPage';
import IncomePage from './pages/Income/IncomePage';

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
