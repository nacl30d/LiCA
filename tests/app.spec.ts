import app = require('../src/app');
import chai from 'chai';
import chaiHttp = require('chai-http');

import 'mocha';

chai.use(chaiHttp);
const should = chai.should();

describe('API Version Request', () => {
    it('should return version', async () => {
        return chai
            .request(app)
            .get('/api/version')
            .then((res) => {
                res.body.should.have.property('version');
            });
    });
});
