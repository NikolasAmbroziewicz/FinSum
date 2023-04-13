import { IHeaderProp, VariantColor } from './Header.types';

const H1: React.FC<IHeaderProp> = ({
  children,
  variant = VariantColor.dark
}) => {
  const textColor = () => {
    return variant === VariantColor.dark ? 'text-gray-600' : 'text-stone-50';
  };

  return <h1 className={`text-center ${textColor()}  text-2xl`}>{children}</h1>;
};

export default H1;
