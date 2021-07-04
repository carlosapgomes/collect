const assert = require('assert');
const app = require('../../src/app');

describe('\'doctors\' service', () => {
  it('registered the service', () => {
    const service = app.service('doctors');

    assert.ok(service, 'Registered the service');
  });
});
