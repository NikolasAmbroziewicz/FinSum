export interface IInputLabel {
  value: string;
}

const InputLabel: React.FC<IInputLabel> = ({ value }) => {
  return (
    <label
      className="block text-gray-600 text-sm font-bold mb-2"
      htmlFor={value}
    >
      {value}
    </label>
  );
};

export default InputLabel;
