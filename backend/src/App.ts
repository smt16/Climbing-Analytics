import express from 'express';
import bodyParser from 'body-parser';
import appConfig from './setup';

// setup env variables etc.
appConfig();

// create Express API
const app = express();
app.use(bodyParser);

app.post('/auth*', )

// Start the express app
if (process.env.PROJECT_ENV === 'dev') {
  app.listen(process.env.PORT, () => { console.log('App listening on', process.env.PORT); });
} else {
  // TODO
  // https.createServer({}, app);
}
