import * as request from 'supertest';
import app from '../src/application'

describe('Care recipients', () => {
  it('exists', async () => {
    await request(app)
      .get('/care_recipients')
      .expect(200)
      .expect((res) => {
        expect(res.body.careRecipients).toBeDefined();
      });
  });
  it('not empty', async () => {
    await request(app)
      .get('/care_recipients')
      .expect(200)
      .expect((res) => {
        expect(res.body.careRecipients.length).toBeGreaterThan(0);
      });
  })
});
