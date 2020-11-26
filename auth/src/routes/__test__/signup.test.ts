import { app } from '../../app';
import request from 'supertest';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 on invalid email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalidEmail',
      password: 'aValidPassword',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'a',
    })
    .expect(400);
});

it('returns a 400 on either missing email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'aValidPassword',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);
});

it('disallows duplicate test', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'aValidPassword',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'aValidPassword',
    })
    .expect(400);
});

it('sets a cookie after a successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'aValidPassword',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
