const route = require('../app');
const chai = require('chai');
const should = chai.should();
const request = require('chai-http');
chai.use(request);

/**
 * GET / route.
 */
describe('GET /', () => {
  it('should render the home page', () => {
    chai.request(route)
      .get('/')
      .end((err, res) => {
        // Check for errors.
        should.not.exist(err);
        // Status code should be 200.
        res.status.should.equal(200);
      });
  });
});