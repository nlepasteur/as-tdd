// libraries
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import faker from 'faker';
// modules
import server from '../server';
// models
import mediumModel from './models/medium-model';
import Project from './models/project-model';
// routes
import channelsRoutes from './api/routes/channels-routes';
import preferedChannelsRoutes from './api/routes/prefered-channels-routes';
import registrationRoutes from './api/routes/registration-routes';
import preferedGridSizeRoutes from './api/routes/prefered-grid-size-routes';
import projectsRoutes from './api/routes/projects-routes';
import mediumsRoutes from './api/routes/mediums-routes';

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
import User from './models/user-model';
app.use(async function (req, res, next) {
  if (!req.session.user) {
    const user = await User.findOne({
      username: 'kaido',
    });
    const forSession = {
      username: user!.username as string,
      _id: user!._id as string,
      email: user!.email as string,
      followed_channels: user!.followed_channels as string[],
    };
    req.session.user = forSession;
    console.log('REQ.SESSION.USER: ', user);
  }
  next();
});

// [...Array(10)].forEach(() => {
//   const mediums = [
//     'MoA8qTUFWbr9wZ1IrYR7R',
//     'ULmDYh6iOahzLFRKBQvkG',
//     'wZ5d1YdcNqYbxDLeNse33',
//     '3_WBaoyGoEO2wWAySCSa8',
//     'dy3hwqthaAJvJdRzT0b3q',
//     'Fi8rJy6zrFYKvIJRoEdll',
//     'txP1PK8VJSvkhJtZdTmis',
//     'nctXJxDwejdvPEI1xcih4',
//     '_K4ChDnTTUUFuFuTP1CTg',
//     'qXQr2F_V84ZBBQ-n8gajm',
//     '2d',
//     '3d',
//   ];
//   let pickedMediums = [];
//   for (const medium_id of mediums) {
//     Math.floor(Math.random() * 2) && pickedMediums.push(medium_id);
//   }

//   const fakeUsername = faker.name.firstName();
//   const fakeFullName = `${fakeUsername} ${faker.name.lastName()}`;
//   const fakeUrl = `https://via.placeholder.com/400?text=a+project+by+${fakeUsername}`;
//   const fakeData = {
//     image: faker.datatype.boolean(),
//     video: faker.datatype.boolean(),
//     video_clip: faker.datatype.boolean(),
//     model_3d: faker.datatype.boolean(),
//     marmoset: faker.datatype.boolean(),
//     pano: faker.datatype.boolean(),
//     user: {
//       medium_avatar_url: fakeUrl,
//       is_organization_owner: faker.datatype.boolean(),
//       is_plus_member: faker.datatype.boolean(),
//       is_staff: faker.datatype.boolean(),
//       pro_member: faker.datatype.boolean(),
//       full_name: fakeFullName,
//       username: fakeUsername,
//       id: faker.datatype.uuid(),
//     },
//     mediums: pickedMediums,
//     title: faker.lorem.words(3),
//     url: `/artwork/${faker.datatype.uuid()}`,
//     smaller_square_cover_url: fakeUrl,
//     hide_as_adult: faker.datatype.boolean(),
//   };
//   const newProject = new Project(fakeData);
//   newProject.save();
// });

// routes
app.use('/registration', registrationRoutes);
app.use('/projects', projectsRoutes);
app.use('/channels', channelsRoutes);
app.use('/prefered/grid-size', preferedGridSizeRoutes);
app.use('/prefered/channels', preferedChannelsRoutes);
app.use('/mediums', mediumsRoutes);

app.get('/', (req, res, next) => {
  console.log(req.query);
  res.json({ message: 'welcome' });
});

export default app;
