import { argv } from 'node:process';
import { config } from 'dotenv';
import path from 'node:path';

export default function appConfig() {
  // set up env varibales
  const projectEnv = argv[2];
  const relativePath = projectEnv === 'dev' ? '/../env/local.env' : '/../env/prod.env';
  const absolutePath = path.resolve(`/${__dirname}${relativePath}`);
  config({ path: absolutePath });
}
