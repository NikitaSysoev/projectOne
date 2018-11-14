const request = require('supertest');
const app = require('./app');

describe('Test the server/app', () => {
  test('It should return Hello world', async () => {
    const response = await request(app).get('/hello');
    expect(response.body.message).toBe('Hello world');
  });
});
