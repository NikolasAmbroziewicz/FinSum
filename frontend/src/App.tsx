import { Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/Dashboard/DashboardPage';

import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

import NotFoundPage from './pages/404/NotFound';
import PrivateRoutes from './pages/Utils/ProtectedRoutes';
import ProtectedAuthRoutes from './pages/Utils/ProtectedAuthRotes';

import AccountsPage from './pages/Accounts/AccountsPage';
import AccountDetailsPage from './pages/AccountDetails/AccountDetails';
import StocksPage from './pages/Stocks/StocksPage';
import CryptocurrencyPage from './pages/Cryptocurrency/CryptocurrencyPage';
import CryptoAccountDetailsPage from './pages/CryptoAccountDetailsPage/CryptoAccountDetailsPage';
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
          path="dashboard"
          element={
            <BaseNavLayout>
              <DashboardPage />
            </BaseNavLayout>
          }
        />
        <Route
          path="stock"
          element={
            <BaseNavLayout>
              <StocksPage />
            </BaseNavLayout>
          }
        />
        <Route path="cryptocurrency">
          <Route
            index
            element={
              <BaseNavLayout>
                <CryptocurrencyPage />
              </BaseNavLayout>
            }
          />
          <Route
            path=':accountId'
            element={
              <BaseNavLayout>
                <CryptoAccountDetailsPage />
              </BaseNavLayout>
            }
          />
        </Route>
        <Route
          path="metals"
          element={
            <BaseNavLayout>
              <MetalsPage />
            </BaseNavLayout>
          }
        />
        <Route path="accounts">
          <Route
            index
            element={
              <BaseNavLayout>
                <AccountsPage />
              </BaseNavLayout>
            }
          />
          <Route
            path=":accountId"
            element={
              <BaseNavLayout>
                <AccountDetailsPage />
              </BaseNavLayout>
            }
          />
        </Route>
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
