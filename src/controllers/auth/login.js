import { setUserInfo, generateToken } from '../../lib/auth';

const login = async (req, res) => {
  const userInfo = setUserInfo(req.user);

  return res.status(200).json({
    token: generateToken(userInfo),
    user: userInfo,
  });
};

export default login;
