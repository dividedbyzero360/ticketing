import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
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
