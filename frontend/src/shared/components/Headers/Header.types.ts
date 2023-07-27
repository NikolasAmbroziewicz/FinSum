export enum Variant {
  'dark',
  'light'
}

export enum Position {
  'left',
  'right',
  'center'
}

export interface IHeaderProp {
  children: JSX.Element | string | string[];
  variant?: Variant;
  position?: Position;
  styles?: string;
}
