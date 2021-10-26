// libraries
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
// modules
import server from '../server';
// routes
// import channelsRoute from '@routes/channels';
import channelsRoute from './api/routes/channels';

const app = express();

app.use(morgan('tiny'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,PUT,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false,
    store: server.store,
  })
);

// just for moment
// later authentication
import User from './models/User';
app.use(async function (req, res, next) {
  const user = await User.findOne({ name: 'james bond' });
  req.session.user = user;
  console.log('REQ: ', req.session);
  next();
});

// routes
app.use('/channels', channelsRoute);

app.get('/', (req, res, next) => {
  res.json({ message: 'welcome' });
});

export default app;
