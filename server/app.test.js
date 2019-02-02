const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('./app');
const User = require('./model/user');

let mongoServer;

describe('app', () => {
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(
      mongoUri,
      { useNewUrlParser: true }
    );
  });

  describe('/api/hello', () => {
    it("It should return 'Hello world' by default", async () => {
      const response = await request(app).get('/api/hello');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Hello world');
    });
  });

  describe('/api/users', () => {
    beforeEach(() => {
      User.deleteMany({}).then(() => {
        const newUser = new User({ _id: 1, name: 'Morgan' });
        const newUser2 = new User({ _id: 2, name: 'Rotts' });
        newUser.save();
        newUser2.save();
      });
    });

    it('GET /api/users/1', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Morgan');
    });

    it('GET /api/users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it('POST /api/users', async () => {
      const resPost = await request(app)
        .post('/api/users')
        .send({ _id: 3, name: 'Lori' });
      expect(resPost.statusCode).toBe(200);
      const resGet = await request(app).get('/api/users');
      expect(resGet.statusCode).toBe(200);
      expect(resGet.body.length).toBe(3);
    });

    it('PUT /api/users/2', async () => {
      const resPut = await request(app)
        .put('/api/users/2')
        .send({ name: 'Fuger' });
      expect(resPut.statusCode).toBe(200);
      const resGet = await request(app).get('/api/users/2');
      expect(resGet.statusCode).toBe(200);
      expect(resGet.body).toEqual({ _id: 2, name: 'Fuger' });
    });

    it('DELETE /api/users/2', async () => {
      const resDel = await request(app).delete('/api/users/2');
      expect(resDel.statusCode).toBe(200);
      expect(resDel.body._id).toBe(2);
      const resGet = await request(app).get('/api/users/2');
      expect(resGet.statusCode).toBe(404);
    });
  });
  afterAll(() => {
    mongoose.disconnect();
    mongoServer.stop();
  });
});
