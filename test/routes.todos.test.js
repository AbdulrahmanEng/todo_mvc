const route = require('../app');
const chai = require('chai');
const should = chai.should();
const request = require('chai-http');
chai.use(request);

/**
 * GET /todos route.
 */
describe('GET /todos', () => {
  it('should redirect to the todos page', () => {
    chai.request(route)
      .get('/todos')
      .end((err, res) => {
        // Check for errors.
        should.not.exist(err);
        // Status code should be 302 (Redirect) because the user is not logged in.
        res.status.should.equal(302);
      });
  });
});