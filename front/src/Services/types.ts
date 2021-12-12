export interface User {
  username: string;
  hasTwoFactor: boolean;
  token: string;
}

export interface UserContextType {
  user: User | undefined;
  setUser: (user: User) => void;
}
