import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import appConfig from './setup';
import { authRouter } from './auth/router';

// setup env variables etc.
appConfig();

// create Express API
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// base paths
app.post('/auth*', authRouter);

// Start the express app
if (process.env.PROJECT_ENV === 'dev') {
  app.listen(process.env.PORT, () => { console.log('App listening on', process.env.PORT); });
} else {
  // TODO
  // https.createServer({}, app);
}
