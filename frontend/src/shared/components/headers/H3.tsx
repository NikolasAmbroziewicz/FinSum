import { IHeaderProp, Variant, Position } from './Header.types';

const H3: React.FC<IHeaderProp> = ({
  children,
  variant = Variant.dark,
  position = Position.center
}) => {
  const textColor = () => {
    return variant === Variant.dark ? 'text-gray-600' : 'text-stone-50';
  };

  return <h3 className={`text-center ${textColor()} text-base`}>{children}</h3>;
};

export default H3;
