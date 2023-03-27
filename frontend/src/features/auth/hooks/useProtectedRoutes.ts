import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'src/store/main'
import { refreshTokens } from 'src/store/user/userSlice'

export const useProtectedRoutes  = () => {
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

  return {
    authUser,
    dispatch,
    isAuthenticated,
    isLoading
  }
}

