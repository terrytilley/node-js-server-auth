import { setUserInfo, generateToken } from '../../lib/auth';

const signIn = async (req, res) => {
  const userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: generateToken(userInfo),
    user: userInfo,
  });
};

export default signIn;
