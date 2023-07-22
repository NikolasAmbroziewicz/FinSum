import { IHeaderProp, Variant, Position } from './Header.types';
import { useHeader } from './useHeader';

const H2: React.FC<IHeaderProp> = ({
  children,
  variant = Variant.dark,
  position = Position.center,
  styles = ''
}) => {
  const { textColor, textPosition} = useHeader(variant, position)

  return (
    <h2 className={`${textColor()} ${textPosition()} text-2xl ${styles}`}>
      {children}
    </h2>
  );
};

export default H2;
