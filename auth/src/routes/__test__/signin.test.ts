import request from 'supertest';
import { app } from '../../app';

it('should return 400 on non-existing user', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'aValidPassword' })
    .expect(400);
});

it('should return 400 on bad password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'aValidPassword',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'differentPassword' })
    .expect(400);
});

it('should return a cookie on suucessful sign in', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'aValidPassword',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'aValidPassword' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
