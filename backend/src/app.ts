// libraries
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
// modules
import server from '../server';
// routes
// import channelsRoute from '@routes/channels';
import channelsRoutes from './api/routes/channels-routes';
import preferedChannelsRoutes from './api/routes/prefered-channels-routes';
import registrationRoutes from './api/routes/registration-routes';
import preferedGridSizeRoutes from './api/routes/prefered-grid-size-routes';
import projectsRoutes from './api/routes/projects-routes';

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
// import User from './models/user-model';
// app.use(async function (req, res, next) {
//   if (!req.session.user) {
//     const user = await User.findOne({
//       name: 'james bond',
//     });
//     const forSession = {
//       name: user!.name as string,
//       _id: user!._id as string,
//       email: user!.email as string,
//       followed_channels: user!.followed_channels as string[],
//     };

//     req.session.user = forSession;
//     console.log('REQ.SESSION.USER: ', user);
//   }
//   next();
// });

// routes
app.use('/registration', registrationRoutes);
app.use('/projects', projectsRoutes);
app.use('/channels', channelsRoutes);
app.use('/prefered/grid-size', preferedGridSizeRoutes);
app.use('/prefered/channels', preferedChannelsRoutes);

app.get('/', (req, res, next) => {
  res.json({ message: 'welcome' });
});

export default app;
