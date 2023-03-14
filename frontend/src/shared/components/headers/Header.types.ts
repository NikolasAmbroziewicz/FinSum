export enum VariantColor {
  'dark',
  'light'
}

export interface IHeaderProp {
  children: JSX.Element | string;
  variant: VariantColor;
}
