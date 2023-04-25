import { IHeaderProp, Variant, Position } from './Header.types';

const H4: React.FC<IHeaderProp> = ({
  children,
  variant = Variant.dark,
  position = Position.center
}) => {
  const textColor = () => {
    return variant === Variant.dark ? 'text-gray-600' : 'text-stone-50';
  };
  return <h4 className={`text-center ${textColor()} text-sm`}>{children}</h4>;
};

export default H4;
