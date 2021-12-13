import express, { Response } from 'express';
import {
  checkSecret,
  compare,
  generateAccessToken,
} from '../auth_tools/auth_tools';
import { getUser } from '../db/users';
import errorCodes from '../middleware/errorCodes';
import { LoginParams, ResponseUser, User } from '../services/types';
import { isString, validateLoginParams } from '../services/utils';

const router = express.Router();

router.post('', (req, res) => {
  const loginParams: LoginParams = validateLoginParams(req.body);
  //Get user
  const user: User | undefined = getUser(loginParams.username);
  if (!user) throw errorCodes.userNotFound;
  //Validate password
  if (!compare(user.password, loginParams.password))
    throw errorCodes.incorrectPassword;
  // Check if user has 2 factor
  if (user.hasTwoFactor) {
    res.json({ message: '2factor', username: user.username });
    return;
  }
  // If not generate token and send
  generateTokenAndSend(res, user);
});

router.post('/qr', (req, res) => {
  const code = req.query.code;
  if (!code || !isString(code)) throw errorCodes.badToken;
  const { username } = req.body;
  if (!isString(username)) throw errorCodes.userNotFound;
  const storedUser = getUser(username);
  // Check code
  if (!storedUser.secret) throw new Error('User does not have two auth');
  const correct = checkSecret(storedUser.secret, code);
  if (!correct) throw errorCodes.badCode;
  //Generate access token
  generateTokenAndSend(res, storedUser);
});

function generateTokenAndSend(res: Response, user: User) {
  //Generate access token
  const token = generateAccessToken(user);
  // Create ResponseUser
  const responseUser: ResponseUser = {
    ...user,
    token,
  };
  delete responseUser.password;
  delete responseUser.secret;
  res.json({ message: 'Hello there!', user: responseUser });
}
export default router;
