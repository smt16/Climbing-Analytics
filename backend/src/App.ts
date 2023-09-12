import appConfig from './setup';
import { authRouter } from './auth/router';

// create Express API
const app = appConfig();

// base paths
app.post('/auth*', authRouter);

// Start the express app
if (process.env.PROJECT_ENV === 'dev') {
  app.listen(process.env.PORT, () => {
    console.log('\n\x1b[96mApp listening on', process.env.PORT, '\x1b[0m\n');
  });
} else {
  // TODO
  // https.createServer({}, app);
}
