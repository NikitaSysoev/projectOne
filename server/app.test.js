const request = require('supertest');
const app = require('./app');

describe('app', () => {
  describe('/api/hello', () => {
    it("It should return 'Hello world' by default", async () => {
      const response = await request(app).get('/api/hello');
      expect(response.body.message).toBe('Hello world');
    });
  });
});
