import { AxiosAdapter } from '../adapters/axios.adapter';

describe('AxiosAdapter', () => {
  it('should be defined', () => {
    expect(new AxiosAdapter()).toBeDefined();
  });
});
