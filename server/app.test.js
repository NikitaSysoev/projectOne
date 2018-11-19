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
      const response = await request(app).get('/api/users/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ id: 1, name: 'Morgan' });
    });

    it('It should create new user', async () => {
      const response = await request(app).post('/api/users');
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual([
        { id: 1, name: 'Morgan' },
        { id: 2, name: 'Fuger' },
      ]);
    });

    it('It should update user by id', async () => {
      const response = await request(app).put('/api/users/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).not.toEqual({ id: 1, name: 'Morgan' });
    });

    it('It should delete user by id', async () => {
      const response = await request(app).del('/api/users/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.name).not.toBe('Morgan');
    });
  });
});
