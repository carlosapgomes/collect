const assert = require('assert');
const app = require('../../src/app');

describe('\'procedures\' service', () => {
  it('registered the service', () => {
    const service = app.service('procedures');

    assert.ok(service, 'Registered the service');
  });
});
