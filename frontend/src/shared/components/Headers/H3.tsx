import { IHeaderProp, Variant, Position } from './Header.types';
import { useHeader } from './useHeader';

const H3: React.FC<IHeaderProp> = ({
  children,
  variant = Variant.dark,
  position = Position.center,
  styles = ''
}) => {
  const { textColor, textPosition } = useHeader(variant, position);

  return (
    <h3 className={`${textColor()} ${textPosition()} text-xl ${styles}`}>
      {children}
    </h3>
  );
};

export default H3;
