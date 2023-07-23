import { Variant, Position } from './Header.types';

export const useHeader = (variant: Variant, position: Position) => {
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

  return {
    textPosition,
    textColor
  };
};
