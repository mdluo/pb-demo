jest.mock('../request');

import request from '../request';

describe('request', () => {
  it('works async', async () => {
    expect.assertions(5);
    const { data } = await request();
    expect(data.buttons.length).toBeGreaterThanOrEqual(4);
    expect(data.buttons.length).toBeLessThanOrEqual(6);
    expect(data.bars.length).toBeGreaterThanOrEqual(2);
    expect(data.bars.length).toBeLessThanOrEqual(6);
    expect(data.limit).toBeGreaterThan(0);
  });
});
