import { configDotenv } from 'dotenv';
import path from 'path';

configDotenv({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
