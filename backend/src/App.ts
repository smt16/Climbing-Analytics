import express from 'express';
import appConfig from './setup';

// setup env variables etc.
appConfig();

// create Express API
const app = express();

// Start the express app
if (process.env.PROJECT_ENV === 'dev') {
  app.listen(process.env.PORT, () => { console.log('App listening on', process.env.PORT); });
} else {
  // TODO
  // https.createServer({}, app);
}
