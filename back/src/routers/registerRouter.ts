import express from 'express';
import { addUser } from '../db/users';
import { RegistrationParams, User } from '../services/types';
import { validateRegistrationParams } from '../services/utils';

const router = express.Router();

router.post('', (req, res) => {
  const regParams: RegistrationParams = validateRegistrationParams(req.body);
  const newUser: User = {
    username: regParams.username,
    password: regParams.password,
    hasTwoFactor: false,
  };
  addUser(newUser);
  res.json({ message: 'Welcome!' });
});

export default router;
