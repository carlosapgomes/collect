const assert = require('assert');
const app = require('../../src/app');

describe('\'proctypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('proctypes');

    assert.ok(service, 'Registered the service');
  });
});
