export interface User {
  username: string;
  hasTwoFactor: boolean;
  token: string;
  qr?: string;
}

export interface UserContextType {
  user: User | undefined;
  image?: string;
  online: boolean | undefined;
  username?: string;
  setUser: (user: User) => void;
  setImage: (image: string) => void;
  setOnline: (bool: boolean) => void;
  setUsername: (username: string) => void;
  clearContext: () => void;
}
