import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from 'src/store/main';
import { useDispatch } from 'react-redux';
import { signUpUser } from 'src/store/user/userSlice';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  registerSchemaType
} from 'src/features/auth/validators';

export const useRegister = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [registerError, setRegisterError] = useState<string>();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema)
  });

  const handleFormSubmit = async (values: registerSchemaType) => {
    try {
      await dispatch(signUpUser(values)).unwrap();
      navigation('/dashboard');
    } catch (error: any) {
      if (error.response?.data.message) {
        setRegisterError(error.response.data.message);
      } else {
        setRegisterError(
          'Upps Something went Wrong! Try Again Later or Check your internet Connection.'
        );
      }
    }
  };

  return {
    errors,
    handleFormSubmit,
    handleSubmit,
    register,
    registerError
  };
};
