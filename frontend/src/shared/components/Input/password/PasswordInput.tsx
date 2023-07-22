import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import BaseInput from '../base/BaseInput';

export interface IPasswordInput {
  id: string;
  placeholder: string;
  formHandler?: UseFormRegisterReturn;
  error?: boolean;
}

const PasswordInput: React.FC<IPasswordInput> = ({
  id,
  error,
  placeholder,
  formHandler
}) => {
  const [passwordVissible, setPasswordVissible] = useState(false);

  const handlePasswordVissibility = () => {
    setPasswordVissible(!passwordVissible);
  };

  return (
    <div className="relative">
      <BaseInput
        type={passwordVissible ? 'text' : 'password'}
        id={id}
        placeholder={placeholder}
        formHandler={formHandler}
        error={error}
      />
      {passwordVissible ? (
        <button type='button' data-test='passwordVisibleIcon' onClick={handlePasswordVissibility}>
          <FiEyeOff
            className="absolute top-2.5 right-2 text-slate-600"
          />
        </button>
      ) : (
        <button type='button' data-test='passwordInvisibleIcon' onClick={handlePasswordVissibility}>
          <FiEye
            className="absolute top-2.5 right-2 text-slate-600"
          />
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
