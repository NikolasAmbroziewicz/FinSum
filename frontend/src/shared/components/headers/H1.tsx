import { IHeaderProp, Variant, Position } from './Header.types';

const H1: React.FC<IHeaderProp> = ({
  children,
  position = Position.center,
  variant = Variant.dark,
  styles = ''
}) => {
  const textColor = () => {
    return variant === Variant.dark ? 'text-gray-600' : 'text-stone-50';
  };

  const textPosition = () => {
    switch(position) {
      case Position.center:
        return 'text-center'
      case Position.left:
        return 'text-left'
      case Position.right:
        return 'text-right'
    }
  }

  return <h1 className={`${textColor()} ${textPosition()}  text-3xl ${styles}`}>{children}</h1>;
};

export default H1;
