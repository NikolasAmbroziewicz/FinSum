import { useNavigate, Outlet } from 'react-router-dom';

import { useProtectedRoutes } from 'src/features/Auth/hooks/useProtectedRoutes';

import Loading from 'src/shared/components/Loading/Loading';
import { LoadingSize } from 'src/shared/components/Loading/types';

const ProtectedAuthRoutes = () => {
  const { isAuthenticated, isLoading } = useProtectedRoutes();
  const navigate = useNavigate();

  const onPreviousNavigation = () => {
    navigate('dashboard');
    return null;
  };

  return isLoading ? (
    <div className="flex h-screen">
      <Loading size={LoadingSize.large} />
    </div>
  ) : isAuthenticated ? (
    onPreviousNavigation()
  ) : (
    <Outlet />
  );
};

export default ProtectedAuthRoutes;
