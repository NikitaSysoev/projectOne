const request = require('supertest');
const app = require('./app');

describe('Test the server/app', () => {
  test('It should return Hello world', (done) => {
    request(app).get('/hello').end((error, response) => {
      expect(response.body.message).toBe('Hello world');
      done();
    });
  });
});
