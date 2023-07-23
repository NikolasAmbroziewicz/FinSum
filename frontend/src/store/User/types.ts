export type Tokens = {
  refreshToken?: string;
  accessToken?: string;
};

export interface UserStore {
  isAuthenticated: boolean;
  user?: {
    email: string;
    name: string;
    surname: string;
  };
  tokens: Tokens;
}
