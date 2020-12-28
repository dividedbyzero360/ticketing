import express from 'express';
import { json } from 'body-parser';

import { errorHandler, NotFoundError, currentUser } from '@walam/common';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';

const app = express();
app.use(json());

// To let express know it is behind the ingnx proxy but to still trust it
app.set('trust proxy', true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
  })
);

app.use(currentUser);

app.use(createTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
