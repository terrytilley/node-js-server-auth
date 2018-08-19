import models from '../../models';

const roleAuthorization = roles => async ({ user }, res, next) => {
  try {
    const foundUser = await models.User.find({ where: { id: user.id } });

    if (roles.indexOf(foundUser.role) > -1) {
      return next();
    }

    res.status(401).json({ error: 'You are not authorized' });
    return next('Unauthorized');
  } catch (err) {
    res.status(422).json({ message: 'No user found' });
    return next(err);
  }
};

export default roleAuthorization;
