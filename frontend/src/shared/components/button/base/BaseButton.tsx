export interface IBaseButton {
  handler?: () => void;
  children: JSX.Element | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const BaseButton: React.FC<IBaseButton> = ({ handler, type, children }) => {
  return (
    <button
      onClick={handler}
      className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded"
      type={type}
    >
      {children}
    </button>
  );
};

export default BaseButton;
