import { Link } from 'react-router-dom';

import { VariantColor } from 'src/shared/components/headers/Header.types';

import FormElement from 'src/features/auth/components/FormElement';
import MainLogo from 'src/images/MainLogo.svg';
import BaseButton from 'src/shared/components/button/base/BaseButton';
import H1 from 'src/shared/components/headers/H1';
import BaseInput from 'src/shared/components/input/base/BaseInput';
import PasswordInput from 'src/shared/components/input/password/PasswordInput';

import { useLogin } from 'src/features/auth/hooks/useLogin';

export default function LoginPage() {
  const { errors, handleSubmit, handleFormSubmit, loginError, register } =
    useLogin();

  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen md:w-3/5 w-screen">
      <Link to="/" className="flex justify-center">
        <img src={MainLogo} alt="Main Logo" className="self-center mb-7 mt-7" />
      </Link>
      <H1 variant={VariantColor.dark}>Sign Up</H1>
      {loginError && (
        <span className="text-red-500 text-md mt-1 text-center">
          {loginError}
        </span>
      )}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4 md:w-3/5 w-4/5 max-w-md"
      >
        <FormElement value="Email" error={errors.email?.message}>
          <BaseInput
            id="Email"
            type="text"
            placeholder="Email"
            error={!!errors.email?.message}
            formHandler={register('email')}
          />
        </FormElement>
        <FormElement value="Email" error={errors.password?.message}>
          <PasswordInput
            id="Password"
            placeholder="Password"
            error={!!errors.password?.message}
            formHandler={register('password')}
          />
        </FormElement>
        <BaseButton type="submit">Submit</BaseButton>
        <Link className="text-center text-sm text-stone-600" to="/">
          Do not You Have account? Register Here!
        </Link>
      </form>
    </div>
  );
}
