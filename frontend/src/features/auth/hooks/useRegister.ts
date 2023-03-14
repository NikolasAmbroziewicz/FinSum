import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

import { useLocalStorage } from 'src/hooks/useLocalStorage';

import { signUp } from 'src/features/auth/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  registerSchemaType
} from 'src/features/auth/validators';

export const useRegister = () => {
  const { setToLocalStorage } = useLocalStorage();
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string>();

  const { mutate } = useMutation('registerUser', signUp, {
    onSuccess: (data) => {
      setToLocalStorage('user', data);
      router.push('/dashboard');
    },
    onError(error: any) {
      if (error.response?.data.message) {
        setRegisterError(error.response.data.message);
      } else {
        setRegisterError(
          'Upps Something went Wrong! Try Again Later or Check your internet Connection.'
        );
      }
    }
  });

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema)
  });

  const handleFormSubmit = (values: registerSchemaType) => {
    mutate(values);
  };

  return {
    errors,
    handleFormSubmit,
    handleSubmit,
    register,
    registerError
  };
};
