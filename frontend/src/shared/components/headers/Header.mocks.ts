import { IHeaderProp, Variant, Position } from './Header.types';

const base: IHeaderProp = {
  children: 'This is awesome Header Text',
  variant: Variant.dark,
  position: Position.center,
  styles: ''
};

export const mockHeadersBaseProps = {
  base
};
