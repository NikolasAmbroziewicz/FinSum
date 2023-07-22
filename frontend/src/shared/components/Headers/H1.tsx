import { IHeaderProp, Variant, Position } from './Header.types';
import { useHeader } from './useHeader';

const H1: React.FC<IHeaderProp> = ({
  children,
  position = Position.center,
  variant = Variant.dark,
  styles = ''
}) => {
  const {textColor, textPosition} = useHeader(variant, position)

  return (
    <h1 className={`${textColor()} ${textPosition()} text-3xl ${styles}`}>
      {children}
    </h1>
  );
};

export default H1;
