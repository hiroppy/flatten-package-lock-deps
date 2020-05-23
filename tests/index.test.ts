import { flattenPackageLockDeps } from '../src';
import lock1 from './fixtures/lock1.json';
import lock2 from './fixtures/lock2.json';

describe('lock1', () => {
  test('should return result when ignoreDeps is true', async () => {
    const res = flattenPackageLockDeps(lock1, { ignoreDev: true });

    expect(res).toMatchSnapshot();
  });

  test('should return result when ignoreDeps is false', async () => {
    const res = flattenPackageLockDeps(lock1);

    expect(res).toMatchSnapshot();
  });
});

describe('lock2', () => {
  test('should return result when ignoreDeps is true', async () => {
    const res = flattenPackageLockDeps(lock2, { ignoreDev: true });

    expect(res).toMatchSnapshot();
  });

  test('should return result when ignoreDeps is false', async () => {
    const res = flattenPackageLockDeps(lock2);

    expect(res).toMatchSnapshot();
  });
});
