import { IHeaderProp, Variant, Position } from './Header.types';
import { useHeader } from './useHeader';

const H4: React.FC<IHeaderProp> = ({
  children,
  variant = Variant.dark,
  position = Position.center,
  styles = ''
}) => {
  const { textColor, textPosition } = useHeader(variant, position)

  return (
    <h4 className={`${textColor()} ${textPosition()} text-base ${styles}`}>
      {children}
    </h4>
  );
};

export default H4;
