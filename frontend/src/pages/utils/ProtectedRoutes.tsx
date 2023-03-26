import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'src/store/main';
import { refreshTokens } from 'src/store/user/userSlice'

import Loading from 'src/shared/components/loading/Lading';
import { LoadingSize } from 'src/shared/components/types';

const PrivateRoutes = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [isAuthenticated, setIsAutheticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const authUser = async () => {
    try {
      await dispatch(refreshTokens()).unwrap()
      setIsAutheticated(true)
      setIsLoading(false)
    } catch (err: any) {
      setIsAutheticated(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    authUser()
  }, [dispatch])

  return (
    isLoading ? 
      <Loading size={LoadingSize.large}/>: 
    isAuthenticated ?
      <Outlet />: 
      <Navigate to="/"/>
  )
}

export default PrivateRoutes