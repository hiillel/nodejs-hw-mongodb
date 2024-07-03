import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {

  const app = express();

  // pino and cors

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // rout

  app.use(contactsRouter);

  // errors

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  // port

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};