import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

const server = http.createServer(app);

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected successfully');
    server.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
bootstrap();
