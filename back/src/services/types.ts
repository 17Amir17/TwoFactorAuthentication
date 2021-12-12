export interface ErrorCodes {
  [key: string]: ErrorCode;
}
export interface ErrorCode {
  message: string;
  code: number;
}

export interface User {
  username: string;
  password: string;
  hasTwoFactor: boolean;
}

export interface ResponseUser extends Omit<User, 'password'> {
  password?: string;
  token: string;
}

export interface RegistrationParams {
  username: string;
  password: string;
}

export interface LoginParams extends RegistrationParams {}

export type JWTPayload = string | Buffer | object;
