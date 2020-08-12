import * as request from 'supertest';
import app from '../src/application'

describe('Hello world', () => {
  it('Hello world', async () => {
    await request(app)
      .get('/hello')
      .expect(200)
      .expect((res) => {
        expect(res.body.greetings).toContain('Hello world ;)');
      });
  })
});
