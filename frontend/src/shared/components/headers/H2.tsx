import { IHeaderProp, Variant, Position } from './Header.types';

const H2: React.FC<IHeaderProp> = ({
  children,
  variant = Variant.dark,
  position = Position.center
}) => {
  const textColor = () => {
    return variant === Variant.dark ? 'text-gray-600' : 'text-stone-50';
  };

  return <h2 className={`text-center ${textColor()} text-xl`}>{children}</h2>;
};

export default H2;
