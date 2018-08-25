import nodemailer from 'nodemailer';
import models from '../../models';
import { cryptoToken } from '../../lib/auth';

const forgotPassword = async ({ body: { email } }, res, next) => {
  try {
    const user = await models.User.find({ where: { email } });

    if (!user) {
      return res.status(200).json({ error: 'No user found' });
    }

    const resetToken = await cryptoToken();
    const resetExpires = new Date(
      new Date().setHours(new Date().getHours() + 1)
    ).toISOString();

    await models.User.update(
      { resetToken, resetExpires },
      { where: { email } }
    );

    const html = `<a href="${
      process.env.CLIENT_URL
    }/reset-password/${resetToken}" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Reset your password</a>`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Password Reset',
      html,
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) return next(err);

      return res
        .status(200)
        .json({ message: `Password reset email sent to ${info.accepted[0]}` });
    });
  } catch (err) {
    return next(err);
  }
};

export default forgotPassword;
