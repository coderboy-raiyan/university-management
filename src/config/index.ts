import { configDotenv } from 'dotenv';
import path from 'path';

configDotenv({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  default_user_pass: process.env.DEFAULT_USER_PASS,
  database_url: process.env.DATABASE_URL,
};
