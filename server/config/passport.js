import passport from 'passport';
import GooglePlusToken from 'passport-google-plus-token';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  'google',
  new GooglePlusToken(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
