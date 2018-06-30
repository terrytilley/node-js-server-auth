import 'dotenv/config';
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
