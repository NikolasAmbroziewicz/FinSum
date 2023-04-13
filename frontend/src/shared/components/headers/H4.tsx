import { IHeaderProp, VariantColor } from './Header.types';

const H4: React.FC<IHeaderProp> = ({
  children,
  variant = VariantColor.dark
}) => {
  const textColor = () => {
    return variant === VariantColor.dark ? 'text-gray-600' : 'text-stone-50';
  };
  return <h4 className={`text-center ${textColor()} text-sm`}>{children}</h4>;
};

export default H4;
