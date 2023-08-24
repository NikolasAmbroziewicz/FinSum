import { ChangeEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IBaseInput {
  id: string;
  placeholder: string;
  type: string;
  changeHandler?: ChangeEventHandler;
  formHandler?: UseFormRegisterReturn;
  value?: string;
  error?: boolean;
  step?: string,
}

const BaseInput: React.FC<IBaseInput> = ({
  id,
  placeholder,
  type,
  changeHandler,
  formHandler,
  value,
  error,
  step = '1'
}) => {
  const borderClass = () => {
    return error ? 'border-rose-400' : 'border-slate-300';
  };

  return (
    <>
      <input
        className={`w-full shadow border ${borderClass()} rounded py-2 px-3 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline focus:borderfocus:border-sky-600
          placeholder:text-slate-300
          `}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        step={step}
        min={0}
        {...formHandler}
      />
    </>
  );
};

export default BaseInput;
