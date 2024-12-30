const fs = require('fs');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const https = require('https');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('node:path');
const passport = require('passport');
const middleware = require('i18next-http-middleware');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');

// express
const express = require('express');
const app = express();

const i18next = require('./translations/i18n-config');
const localAuth = require('./passport/local.passport');
const googleAuth = require('./passport/google.passport');
const { errorHandler } = require('./errors/error-handler');
const { checkLoggedIn } = require('./middlewares/login.middlewares');
const { checkUserType } = require('./middlewares/user-type.middlewares');
const cookieSessionOptions = require('./middlewares/cookie-session.middleware');
const types = require('pg').types;
types.setTypeParser(1082, val => val);

// routes
const authRouter = require('./routes/auth/auth.router');
const eventsRouter = require('./routes/events/events.router');
const clientRouter = require('./routes/clients/clients.router');
const picturesRouter = require('./routes/pictures/pictures.router');
const listingsRouter = require('./routes/listings/listings.router');
const categoriesRouter = require('./routes/categories/categories.router');
const presentationsRouter = require('./routes/presentations/presentations.router');
const checkVerifiedRouter = require('./routes/check-verified/check-verified.router');
const listingPresetsRouter = require('./routes/listing-presets/listing-presets.router');

// const server = https.createServer({
//   cert: fs.readFileSync(`${path.resolve()}/src/security/cert.pem`),
//   key: fs.readFileSync(`${path.resolve()}/src/security/key.pem`)
// }, app);

//options
const corsOptions = {
  origin: [ `https://${process.env.CLIENT_BASE_URL}`, `https://www.${process.env.CLIENT_BASE_URL}` ],
  credentials: true,
}
const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'img-src': ["'self'", 'https://res.cloudinary.com'],
    }
  },
}
const urlencodedOptions = {
  limit: '50mb',
  extended: false
}

//passport
passport.use(new GoogleStrategy(googleAuth.AUTH_OPTIONS, googleAuth.verifyCallback));
passport.use(new LocalStrategy(localAuth.AUTH_OPTIONS, localAuth.verifyCallback));
passport.serializeUser((user, done) => {
  console.log('serializing user: ', user)
  done(null, user);
});
passport.deserializeUser((id, done) => {
  console.log('deserializing user: ', id)
  done(null, id); 
});

//middelwares
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(cookieSession(cookieSessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded(urlencodedOptions));
app.use(morgan('combined'));
app.use(middleware.handle(i18next));

//routes
app.use('/auth', authRouter);
app.use(checkUserType);
app.use(checkLoggedIn);
app.use('/listings', listingsRouter);
app.use('/clients', clientRouter);
app.use('/pictures', picturesRouter);
app.use('/categories', categoriesRouter);
app.use('/presentations', presentationsRouter);
app.use('/events', eventsRouter);
app.use('/listingpresets', listingPresetsRouter);
app.use('/checkverified', checkVerifiedRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`Listening to port ${PORT}`) });
