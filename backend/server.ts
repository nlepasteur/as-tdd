// types
// import type { Request as RequestType } from 'express';
// import type { Session as SessionType } from 'express-session';
// libraries
import 'module-alias/register';
import mongoose from 'mongoose';
import session from 'express-session';
import mongodbSession from 'connect-mongodb-session';
import { config } from 'dotenv';
config();

// type SessionAppType = SessionType & { user: { [key: string]: any } };

const Session = mongodbSession(session);

export default {
  store: new Session({
    uri: process.env.DB as string,
    collection: 'sessions',
  }),
};

import app from './src/app';

const port = process.env.PORT || 8080;

const mongodb = process.env.DB as string;

mongoose.connect(mongodb);

app.listen(port, () => console.log(`Server is running on port ${port}`));
