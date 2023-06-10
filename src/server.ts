import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

const server = http.createServer(app);

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected successfully');
    server.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error: any) {
    errorLogger.error(error.message);
  }
}
bootstrap();
