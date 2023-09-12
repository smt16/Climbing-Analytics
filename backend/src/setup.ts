import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { argv } from 'node:process';
import { config } from 'dotenv';
import path from 'node:path';

/**
 * Performs all app configuration
 * @returns The configured Express app
 */
export default function appConfig() {
  // set up env varibales
  const projectEnv = argv[2];
  const relativePath = projectEnv === 'dev' ? '/../env/local.env' : '/../env/prod.env';
  const absolutePath = path.resolve(`/${__dirname}${relativePath}`);
  config({ path: absolutePath });

  // steup app with middleware
  const app = express();
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.BACKEND_URL as string);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(cors({ origin: process.env.FRONTEND_URL }));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return app;
}
