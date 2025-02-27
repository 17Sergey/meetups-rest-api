import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import passport from "passport";
import { userRepository } from "@repositories/UserRepository";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "",
};

const jwtVerify = async (jwt_payload: any, done: VerifiedCallback) => {
  try {
    const user = await userRepository.getById(jwt_payload.id);

    if (!user) {
      return done(
        new Error("User not found"),
        /* 
        It doesn't make sense but if there's no user - we pass false as a 2-d param.
        See docs: https://www.passportjs.org/packages/passport-jwt 
      */
        false,
      );
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategy = new Strategy(options, jwtVerify);

passport.use(jwtStrategy);
