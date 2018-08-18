import models from '../../models';
import { setUserInfo, generateToken } from '../../lib/auth';

const register = async (req, res, next) => {
  try {
    const user = await models.User.create(req.body);
    const userInfo = setUserInfo(user);

    return res.status(201).json({
      token: generateToken(userInfo),
      user: userInfo,
    });
  } catch (err) {
    return next(err);
  }
};

export default register;
