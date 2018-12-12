const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('./app');
const User = require('./model/user');

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

let mongoServer;

describe('app', () => {
  describe('/api/hello', () => {
    it("It should return 'Hello world' by default", async () => {
      const response = await request(app).get('/api/hello');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Hello world');
    });
  });

  describe('/api/users', () => {
    beforeAll(async () => {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      await mongoose.connect(
        mongoUri,
        { useNewUrlParser: true },
        err => {
          if (err) console.error(err);
        }
      );
    });

    beforeEach(() => {
      User.deleteMany({}).then(() => {
        const newUser = new User({ _id: 1, name: 'Morgan' });
        newUser.save();
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
      expect(response.body.length).toBe(1);
    });

    it('POST /api/users', async () => {
      const resPost = await request(app)
        .post('/api/users')
        .send({ _id: 2, name: 'Rotts' });
      expect(resPost.statusCode).toBe(200);
      const resGet = await request(app).get('/api/users');
      expect(resGet.statusCode).toBe(200);
      expect(resGet.body.length).toBe(2);
    });

    it('PUT /api/users/1', async () => {
      const resPut = await request(app)
        .put('/api/users/1')
        .send({ name: 'Fuger' });
      expect(resPut.statusCode).toBe(200);
      const resGet = await request(app).get('/api/users/1');
      expect(resGet.statusCode).toBe(200);
      expect(resGet.body.name).toBe('Fuger');
    });

    it('DELETE /api/users/1', async () => {
      const resDel = await request(app).del('/api/users/1');
      expect(resDel.statusCode).toBe(200);
      const resGet = await request(app).get('/api/users/1');
      expect(resGet.statusCode).toBe(404);
    });

    afterAll(() => {
      mongoose.disconnect();
      mongoServer.stop();
    });
  });
});
