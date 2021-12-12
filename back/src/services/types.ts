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
}

export interface RegistrationParams {
  username: string;
  password: string;
}
