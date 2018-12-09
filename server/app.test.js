const request = require('supertest');
const app = require('./app');
const database = require('./db/database');
const User = require('./model/user');

describe('app', () => {
  describe('/api/hello', () => {
    it("It should return 'Hello world' by default", async () => {
      const response = await request(app).get('/api/hello');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Hello world');
    });
  });

  describe('/api/users', () => {
    beforeAll(() => {
      database.connect();
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
      expect(response.body.users.length).toBe(1);
    });

    it('POST /api/users', async () => {
      const resPost = await request(app)
        .post('/api/users')
        .send({ _id: 2, name: 'Rotts' });
      expect(resPost.statusCode).toBe(200);
      const resGet = await request(app).get('/api/users');
      expect(resGet.statusCode).toBe(200);
      expect(resGet.body.users.length).toBe(2);
    });

    it('PUT /api/users/1', async () => {
      const resPut = await request(app)
        .put('/api/users/1')
        .send('Fuger');
      expect(resPut.statusCode).toBe(200);
      const resGet = await request(app).get('/api/users/1');
      expect(resGet.statusCode).toBe(200);
      expect(resGet.body).toEqual({ _id: 1, name: 'Fuger' });
    });

    it('DELETE /api/users/1', async () => {
      const resDel = await request(app).del('/api/users/1');
      expect(resDel.statusCode).toBe(200);
      const resGet = await request(app).get('/api/users/1');
      expect(resGet.statusCode).toBe(404);
    });

    afterAll(done => {
      database.disconnect(done);
    });
  });
});
