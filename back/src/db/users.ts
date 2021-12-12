import { encrypt } from '../auth_tools/auth_tools';
import errorCodes from '../middleware/errorCodes';
import { User } from '../services/types';

const users: { [key: string]: User } = {};

export function getUser(username: string): User {
  const user: User | undefined = users[username];
  if (!user) throw errorCodes.userNotFound;
  return user;
}

export function addUser(user: User): void {
  user.password = encrypt(user.password);
  users[user.username] = user;
}

export function userExists(username: string): boolean {
  return !!users[username];
}

export function addTwoFactor(
  username: string,
  secret: string,
  qr: string
): void {
  if (users[username]) {
    users[username].hasTwoFactor = true;
    users[username].secret = secret;
    users[username].qr = qr;
  }
}
