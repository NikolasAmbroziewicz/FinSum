import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from 'src/store/main';
import { useDispatch } from 'react-redux';
import { signInUser } from 'src/store/User/UserSlice';

import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, loginSchemaType } from 'src/features/Auth/validators';

export const useLogin = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [loginError, setLoginError] = useState<string>();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema)
  });

  const handleFormSubmit = async (values: loginSchemaType) => {
    try {
      await dispatch(signInUser(values)).unwrap();
      navigation('/dashboard');
    } catch (error: any) {
      if (error.response?.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError(
          'Upps Something went Wrong! Try Again Later or Check your internet Connection.'
        );
      }
    }
  };

  return {
    loginError,
    errors,
    register,
    handleSubmit,
    handleFormSubmit,
  };
};
