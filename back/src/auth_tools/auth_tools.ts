import bcrypt from 'bcrypt';

export function encrypt(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function compare(hash: string, password: string | Buffer) {
  return bcrypt.compareSync(password, hash);
}
