import request from 'supertest';
import { app } from '../../app';

it('needs to have a route /api/tickets', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});

it('needs to be signed in to access the /api/tickets', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).toEqual(401);
});

it('returns a status code other than 401 when signed in', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(401);
});

it('return an error on invalid title', async () => {});

it('return an error on invalid price', async () => {});
it('creates a ticket on valid input', async () => {});
