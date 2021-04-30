import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { default as logger } from 'morgan';
import indexRouter from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', indexRouter);

module.exports = app;
