import request from 'supertest';
import { app } from '../../app';

it('should return an authenticated user when a user is logged in', async () => {
  const cookie = await global.signup();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('should return null when there is no cookie set', async () => {
  const response = await request(app).get('/api/users/currentuser').expect(200);
  expect(response.body.currentUser).toBe(null);
});
