import app from 'app';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import {
  LINE_SIGNATURE_HTTP_HEADER_NAME,
  WebhookRequestBody,
} from '@line/bot-sdk';
import LineService from 'services/line.service';

chai.use(chaiHttp);
const should = chai.should();

const dummyRequestBody: WebhookRequestBody = {
  destination: 'Uabcdefghijklmnopqrstuvwxyz123456',
  events: [],
};
const signature: string = LineService.createSignature(dummyRequestBody);

describe('API Endpoint Request', () => {
  it('should respond error if request with no signeture', async () => {
    return chai
      .request(app)
      .post('/api/line/webhook')
      .send(dummyRequestBody)
      .then((res) => {
        res.should.have.status(500);
      });
  });

  it('should respond 200 if request with valid signeture', async () => {
    return chai
      .request(app)
      .post('/api/line/webhook')
      .set(LINE_SIGNATURE_HTTP_HEADER_NAME, signature)
      .send(dummyRequestBody)
      .then((res) => {
        res.should.have.status(200);
      });
  });
});
