import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import { default as logger } from 'morgan';
import indexRouter from './routes/index';

const app: Application = express();
const env: string = process.env.NODE_ENV || 'development';

if (env === 'development') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', indexRouter);

module.exports = app;
