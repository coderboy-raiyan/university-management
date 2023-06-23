import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

const server = http.createServer(app);

process.on('uncaughtException', (error: any) => {
  errorLogger.error(error);
  process.exit(1);
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected successfully');
    server.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
    process.on('unhandledRejection', (error: any) => {
      if (server) {
        server.close(() => {
          errorLogger.error(error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (error: any) {
    errorLogger.error(error.message);
  }
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
    process.exit(1);
  }
});
