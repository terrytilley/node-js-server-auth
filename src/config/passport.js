import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import models from '../models';

const localLogin = new LocalStrategy(async (username, password, done) => {
  const user = await models.User.findOne({ where: { username }, raw: true });

  if (!user) {
    return done(null, false);
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return done(null, false);
  }

  return done(null, user);
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await models.User.findOne({
      where: { id: payload.sub },
      raw: true,
    });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);

export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireLogin = passport.authenticate('local', { session: false });
