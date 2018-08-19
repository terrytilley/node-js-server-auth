import bcrypt from 'bcrypt';
import models from '../../models';

const resetPassword = async ({ body: { password, token } }, res, next) => {
  try {
    const user = await models.User.find({ where: { resetToken: token } });

    if (!user) {
      return res.status(200).json({ message: 'No user found' });
    }

    const { id, resetExpires } = user;
    const hashedPassword = await bcrypt.hash(password, 12);

    const currentTime = new Date(
      new Date().setHours(new Date().getHours())
    ).toISOString();

    if (resetExpires.toString() > currentTime.toString()) {
      await models.User.update(
        {
          resetToken: null,
          resetExpires: null,
          password: hashedPassword,
        },
        { where: { id } }
      );
    }

    return res.status(200).json({ message: 'Password successfully reset' });
  } catch (err) {
    return next(err);
  }
};

export default resetPassword;
