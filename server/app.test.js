const request = require('supertest');
const app = require('./app');
const User = require('./model/user');
const database = require('./config/database');

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

    it('GET /api/users/:id', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ id: 1, name: 'Morgan' });
    });

    it('GET /api/users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(200);
      expect(response.body.users.length).toBe(1);
    });

    it('POST /api/users', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ id: 1, name: 'Morgan' });
      expect(response.statusCode).toBe(200);
      const users = await User.find({ id: 1, name: 'Morgan' });
      expect(users.length).toBe(1);
      expect(users[0]).toEqual({ id: 1, name: 'Morgan' });
    });

    it('PUT /api/users/:id', async () => {
      const response = await request(app)
        .put('/api/users/1')
        .send('Fuger');
      expect(response.statusCode).toBe(200);
      const user = await User.findById(1);
      expect(user).toEqual({ id: 1, name: 'Fuger' });
    });

    it('DELETE /api/users/:id', async () => {
      const response = await request(app).del('/api/users/1');
      expect(response.statusCode).toBe(200);
      const deleteUser = await User.findById(1);
      expect(deleteUser.id).toNotExist();
    });

    afterAll(done => {
      database.disconnect(done);
    });
  });
});
