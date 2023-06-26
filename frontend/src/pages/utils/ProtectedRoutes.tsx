import { Outlet, Navigate } from 'react-router-dom';

import { useProtectedRoutes } from 'src/features/Auth/hooks/useProtectedRoutes';

import Loading from 'src/shared/components/Loading/Loading';
import { LoadingSize } from 'src/shared/components/Loading/types';

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useProtectedRoutes();

  return isLoading ? (
    <div className="flex h-screen">
      <Loading size={LoadingSize.large} />
    </div>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
