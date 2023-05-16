import { ButtonTheme } from "./types";

export interface IBaseButton {
  handler?: () => void;
  children: JSX.Element | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: ButtonTheme,
  styles?: string
}

const BaseButton: React.FC<IBaseButton> = ({ color = ButtonTheme.base, handler, type, styles, children }) => {

  const buttonColor = () => {
    return color === ButtonTheme.base ? 'bg-sky-500 hover:bg-sky-600' : 'bg-red-600 hover:bg-red-500'
  }

  return (
    <button
      onClick={handler}
      className={`${buttonColor()} text-white py-2 px-4 rounded ${styles}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default BaseButton;
