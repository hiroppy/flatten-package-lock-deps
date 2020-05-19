import { flattenPackageLockDeps } from '../src';

test('should return result', async () => {
  const { default: lock } = await import('./fixtures/lock1.json');
  const res = flattenPackageLockDeps(lock);

  expect(res).toMatchSnapshot();
});
