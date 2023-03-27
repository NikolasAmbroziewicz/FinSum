import { useNavigate, Outlet } from 'react-router-dom'

import { useProtectedRoutes } from 'src/features/auth/hooks/useProtectedRoutes'

import Loading from 'src/shared/components/loading/Lading'
import { LoadingSize } from 'src/shared/components/types'

const ProtectedAuthRoutes = () => {
  const { isAuthenticated, isLoading } = useProtectedRoutes()
  const navigate = useNavigate()

  const onPreviousNavigation = () => {
    navigate(-1)
    return null
  }

  return (
    isLoading ?
      <Loading size={LoadingSize.large} />:
    isAuthenticated ?
      onPreviousNavigation():
      <Outlet />
  )
}

export default ProtectedAuthRoutes