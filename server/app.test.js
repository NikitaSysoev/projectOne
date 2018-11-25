const request = require('supertest');
const app = require('./app');

describe('app', () => {
  describe('/api/hello', () => {
    it("It should return 'Hello world' by default", async () => {
      const response = await request(app).get('/api/hello');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Hello world');
    });
  });

  describe('/api/users', () => {
    it('It should retrieve user by id', async () => {
      await request(app)
        .get('/api/users/1')
        .expect(200, {
          id: 1,
          name: 'Morgan',
        });
    });

    it('It should create new user', async () => {
      await request(app)
        .get('/api/users')
        .expect(200);
      await request(app)
        .post('/api/users')
        .send({ id: 1, name: 'Morgan' })
        .expect(201, {
          id: 1,
          name: 'Morgan',
        });
    });

    it('It should update user by id', async () => {
      await request(app)
        .get('/api/users/1')
        .expect(200, {
          id: 1,
          name: 'Morgan',
        });
      await request(app)
        .put('/api/users/1')
        .send('Fuger')
        .expect(200, {
          id: 1,
          name: 'Fuger',
        });
    });

    it('It should delete user by id', async () => {
      await request(app)
        .get('/api/users/1')
        .expect(200, {
          id: 1,
          name: 'Morgan',
        });
      await request(app)
        .del('/api/users/1')
        .expect(404);
    });
  });
});
