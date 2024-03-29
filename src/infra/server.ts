import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { errors } from 'celebrate';
import AppError from '../errors/AppError';
import routes from './routes';

import '../container';

createConnection();

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3337, () => {
  console.log('Server started on port:3337!');
});
