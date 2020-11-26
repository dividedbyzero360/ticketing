import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signup(): Promise<string[]>;
    }
  }
}

let mongod: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  mongod = new MongoMemoryServer();
  const uri = await mongod.getUri();
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});

beforeEach(async function () {
  let collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongod.stop();
  mongoose.connection.close();
});

global.signup = async () => {
  const email = 'test@test.com';
  const password = 'aValidPassword';
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);
  const cookie = response.get('Set-Cookie');
  return cookie;
};
