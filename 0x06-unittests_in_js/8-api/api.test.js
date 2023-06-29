const chai = require('chai');
const request = require('request');
const sinon = require('sinon');
const server = require('./api');

const { expect } = chai;

describe('Index page', () => {
  let stub;

  before(() => {
    stub = sinon.stub(console, 'log');
  });

  after(() => {
    stub.restore();
    server.close();
  });

  it('should return correct status code', (done) => {
    request.get('http://localhost:7865', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return correct result', (done) => {
    request.get('http://localhost:7865', (error, response, body) => {
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });

  it('should log message to the browser console', () => {
    sinon.assert.calledWith(stub, 'API available on localhost port 7865');
  });
});
