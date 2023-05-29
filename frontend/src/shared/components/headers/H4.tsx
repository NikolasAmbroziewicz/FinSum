import { IHeaderProp, Variant, Position } from './Header.types';

const H4: React.FC<IHeaderProp> = ({
  children,
  variant = Variant.dark,
  position = Position.center,
  styles = ''
}) => {
  const textColor = () => {
    return variant === Variant.dark ? 'text-gray-600' : 'text-stone-50';
  };

  const textPosition = () => {
    switch (position) {
      case Position.center:
        return 'text-center';
      case Position.left:
        return 'text-left';
      case Position.right:
        return 'text-right';
    }
  };
  return (
    <h4 className={`${textColor()} ${textPosition()} text-base ${styles}`}>
      {children}
    </h4>
  );
};

export default H4;
