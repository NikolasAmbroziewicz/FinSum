import { Link } from 'react-router-dom';

import { useScreen } from 'src/shared/hooks/useScreen';
import { useRegister } from 'src/features/auth/hooks/useRegister';

import BaseButton from 'src/shared/components/button/base/BaseButton';
import H1 from 'src/shared/components/headers/H1';
import H3 from 'src/shared/components/headers/H3';
import H4 from 'src/shared/components/headers/H4';
import BaseInput from 'src/shared/components/input/base/BaseInput';
import PasswordInput from 'src/shared/components/input/password/PasswordInput';

import { Variant } from 'src/shared/components/headers/Header.types';
import FeatureList from 'src/features/auth/components/FeatureList';
import FormElement from 'src/features/auth/components/FormElement';
import MainLogo from 'src/shared/images/MainLogo.svg';

export default function RegisterPage() {
  const { isTabletScreen } = useScreen();
  const { errors, handleFormSubmit, handleSubmit, register, registerError } =
    useRegister();

  return (
    <div className="flex justify-center">
      {!isTabletScreen() && (
        <div className="flex flex-col w-2/5 h-screen bg-sky-600 p-12 justify-center">
          <Link to="/" className="flex justify-center">
            <img
              src={MainLogo}
              alt="Main Logo"
              className="self-center mb-7 mt-7"
            />
          </Link>
          <H1 variant={Variant.light}>
            Add Your Financial Assets into One App, and Track them in One App
          </H1>
          <FeatureList />
          <H3 variant={Variant.light}>And So much More!</H3>
          <H4 variant={Variant.light}>Just Join Us!</H4>
        </div>
      )}
      <div className="flex flex-col justify-center items-center h-screen md:w-3/5 w-screen">
        {isTabletScreen() && (
          <Link to="/" className="flex">
            <img
              src={MainLogo}
              alt="Main Logo"
              className="self-center mb-7 mt-7"
            />
          </Link>
        )}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4 md:w-3/5 w-4/5 max-w-md"
        >
          {registerError && (
            <span className="text-red-500 text-md mt-1 text-center">
              {registerError}
            </span>
          )}
          {isTabletScreen() && <H1 variant={Variant.dark}>Sign In</H1>}
          <FormElement value="Name" error={errors.name?.message}>
            <BaseInput
              id="Name"
              type="text"
              placeholder="Name"
              error={!!errors.name?.message}
              formHandler={register('name')}
            />
          </FormElement>
          <FormElement value="Surname" error={errors.name?.message}>
            <BaseInput
              id="Surname"
              type="text"
              placeholder="Surname"
              error={!!errors.name?.message}
              formHandler={register('surname')}
            />
          </FormElement>
          <FormElement value="Email" error={errors.email?.message}>
            <BaseInput
              id="Email"
              type="text"
              placeholder="Email"
              error={!!errors.email?.message}
              formHandler={register('email')}
            />
          </FormElement>

          <FormElement value="Password" error={errors.password?.message}>
            <PasswordInput
              id="Password"
              placeholder="Password"
              error={!!errors.password?.message}
              formHandler={register('password')}
            />
          </FormElement>
          <FormElement
            value="Password Confirmation"
            error={errors.passwordConfirmation?.message}
          >
            <PasswordInput
              id="PasswordConfirmation"
              placeholder="Password Confirmation"
              error={!!errors.passwordConfirmation?.message}
              formHandler={register('passwordConfirmation')}
            />
          </FormElement>
          <BaseButton type="submit">Submit</BaseButton>
          <Link className="text-center text-sm text-stone-600" to="/login">
            Do You Have account? Log In Here!
          </Link>
        </form>
      </div>
    </div>
  );
}
