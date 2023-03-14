import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

import { useLocalStorage } from 'src/hooks/useLocalStorage';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, loginSchemaType } from 'src/features/auth/validators';
import { singIn } from 'src/features/auth/api/user';

export const useLogin = () => {
  const [loginError, setLoginError] = useState<string>();
  const { setToLocalStorage } = useLocalStorage();
  const router = useRouter();

  const { mutate } = useMutation('loginUser', singIn, {
    onSuccess: (data) => {
      setToLocalStorage('user', data);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      if (error.response?.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError(
          'Upps Something went Wrong! Try Again Later or Check your internet Connection.'
        );
      }
    }
  });

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema)
  });

  const handleFormSubmit = (values: loginSchemaType) => {
    mutate(values);
  };

  return {
    loginError,
    errors,
    register,
    handleSubmit,
    handleFormSubmit
  };
};
