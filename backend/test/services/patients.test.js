const assert = require('assert');
const app = require('../../src/app');

describe('\'patients\' service', () => {
  it('registered the service', () => {
    const service = app.service('patients');

    assert.ok(service, 'Registered the service');
  });
});
