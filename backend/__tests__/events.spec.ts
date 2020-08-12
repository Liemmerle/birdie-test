import * as request from 'supertest';
import app from '../src/application'

describe('events', () => {
  it('invalid care recipient id', async () => {
    await request(app)
      .get('/events/0/1556316000000/1556346366000')
      .expect(200)
      .expect((res) => {
        expect(res.body.events).toMatchObject([]);
      });
  });
  it('invalid dates', async () => {
    await request(app)
      .get('/events/df50cac5-293c-490d-a06c-ee26796f850d/a/b')
      .expect(400)
      .expect((res) => {
        expect(res.body.events).toBeUndefined();
        expect(res.body.error).toMatch("invalid date format");
      });
  });
  it('no events', async () => {
    await request(app)
      .get('/events/df50cac5-293c-490d-a06c-ee26796f850d/0/1000')
      .expect(200)
      .expect((res) => {
        expect(res.body.events).toMatchObject([]);
      });
  });
  it('everything is valid', async () => {
    await request(app)
      .get('/events/df50cac5-293c-490d-a06c-ee26796f850d/1556316000000/1556346366000')
      .expect(200)
      .expect((res) => {
        expect(res.body.events).toMatchObject([
          {
            alert_id: null,
            care_recipient_id: "df50cac5-293c-490d-a06c-ee26796f850d",
            caregiver_id: "Arlena", "event_type": "check_in",
            id: "49d3fc24-592c-4ffe-831f-583ca9c8888a",
            observation_event_id: null,
            payload: {
              care_recipient_id: "df50cac5-293c-490d-a06c-ee26796f850d",
              caregiver_id: "Arlena",
              event_type: "check_in",
              id: "49d3fc24-592c-4ffe-831f-583ca9c8888a",
              timestamp: "2019-04-27T06:26:05.408Z",
              visit_id: "5cc38d70-8b66-f8a8-412c-282fc4ca9c44",
            },
            payload_as_text: "{\"id\": \"49d3fc24-592c-4ffe-831f-583ca9c8888a\", \"visit_id\": \"5cc38d70-8b66-f8a8-412c-282fc4ca9c44\", \"timestamp\": \"2019-04-27T06:26:05.408Z\", \"event_type\": \"check_in\", \"caregiver_id\": \"63f3eb22-80ed-4b04-b7e0-35fee66bf30a\", \"care_recipient_id\": \"df50cac5-293c-490d-a06c-ee26796f850d\"}",
            rejected_event_id: null,
            task_instance_id: null,
            timestamp: "2019-04-27T06:26:05.408Z",
            visit_id: "5cc38d70-8b66-f8a8-412c-282fc4ca9c44"
          }]);
      });
  });
});
