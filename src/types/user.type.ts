export type AuthState = {
    userInfo: any | null;
    isAuthenticated: boolean;
    accessToken: string;
    refreshToken: string | undefined;
  };