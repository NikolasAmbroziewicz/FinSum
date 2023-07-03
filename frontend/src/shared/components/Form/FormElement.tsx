import InputLabel from 'src/shared/components/Input/label/InputLabel';

export interface IFormElement {
  value: string;
  children: JSX.Element;
  error: string | undefined;
}

const FormElement: React.FC<IFormElement> = ({ value, children, error }) => {
  return (
    <div>
      <InputLabel value={value} />
      {children}
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default FormElement;
