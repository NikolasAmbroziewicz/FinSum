import { Outlet, Navigate } from 'react-router-dom'

import { useProtectedRoutes } from 'src/features/auth/hooks/useProtectedRoutes';

import Loading from 'src/shared/components/loading/Lading';
import { LoadingSize } from 'src/shared/components/types';

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading  } = useProtectedRoutes()

  return (
    isLoading ? 
      <Loading size={LoadingSize.large}/>: 
    isAuthenticated ?
      <Outlet />: 
      <Navigate to="/"/>
  )
}

export default PrivateRoutes