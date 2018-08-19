import { setUserInfo } from '../../lib/auth';

const user = async (req, res) => {
  const userInfo = setUserInfo(req.user);

  return res.status(200).json({ user: userInfo });
};

export default user;
