import 'dotenv/config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const setUserInfo = user => {
  const getUserInfo = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  return getUserInfo;
};

export const generateToken = user => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.SECRET, {
    expiresIn: 604800, // a week in seconds
  });
};

export const cryptoToken = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('hex'));
      }
    });
  });
