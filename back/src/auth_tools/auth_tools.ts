import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import twofactor = require('node-2fa');
import { JWTPayload } from '../services/types';

const SECRET = process.env.SECRET || 'secret';

const validTokens: { [key: string]: string } = {};

export function encrypt(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function compare(hash: string, password: string | Buffer) {
  return bcrypt.compareSync(password, hash);
}

export function generateAccessToken(data: JWTPayload) {
  const token = generateToken(data, '10h');
  validTokens[token] = '.';
  return token;
}

export function generateToken(data: JWTPayload, exp: string) {
  return jwt.sign(data, SECRET, {
    expiresIn: exp,
  });
}

export function validateToken(accessKey: string) {
  try {
    console.log('Is this valid?', validTokens[accessKey]);
    if (!validTokens[accessKey]) return false;
    return jwt.verify(accessKey, SECRET);
  } catch (error) {
    return false;
  }
}

export function generateTwoFactor(
  appName: string = 'TwoFactor',
  username: string
) {
  return twofactor.generateSecret({ name: appName, account: username });
}

export function deleteToken(token: string) {
  console.log(validTokens[token]);

  if (validTokens[token]) {
    delete validTokens[token];
    console.log('TOKEN', validTokens[token]);
  }
}
