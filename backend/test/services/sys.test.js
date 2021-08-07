const assert = require('assert');
const app = require('../../src/app');

describe('\'sys\' service', () => {
  it('registered the service', () => {
    const service = app.service('sys');

    assert.ok(service, 'Registered the service');
  });
});
