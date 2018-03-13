const route = require('../app');
const chai = require('chai');
const should = chai.should();
const request = require('chai-http');
chai.use(request);

/**
 * GET /login route.
 */
describe('GET /login', () => {
  it('should render the login page', () => {
    chai.request(route)
      .get('/login')
      .end((err, res) => {
        // Check for errors.
        should.not.exist(err);
        // Status code should be 200.
        res.status.should.equal(200);
      });
  });
});