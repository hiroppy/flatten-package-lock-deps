type Package = {
  version: string;
  resolved: string;
  integrity: string;
  dev?: boolean;
  requires?: {
    [key in string]: string;
  };
  dependencies?: {
    [key in string]: Package;
  };
};

export type PackageLock = {
  name: string;
  version: string;
  lockfileVersion: number;
  requires: boolean;
  dependencies: {
    [key in string]: Package;
  };
};

type Options = {
  ignoreDev: boolean;
};

type ModulesList = {
  [key in string]: {
    dev: boolean;
    depth: number;
    name: string;
    version: string;
    resolved: string;
    integrity: string;
    parents: string[];
  };
};

export function flattenPackageLockDeps(packageLock: PackageLock, options?: Options) {
  const res: ModulesList = {};
  const { dependencies } = packageLock;
  const { ignoreDev = false } = options || {};

  function walk(dep: Package, name: string, depth: number, parentName: string) {
    const { version, resolved, integrity, dev, dependencies } = dep;

    if (ignoreDev && dev) {
      return;
    }

    const key = `${name}@${version}`;

    if (res[key]) {
      res[key].parents.push(parentName);
    } else {
      res[key] = {
        dev: !!dev,
        depth,
        name,
        version,
        resolved,
        integrity,
        parents: depth === 0 ? [] : [parentName],
      };
    }

    if (dependencies) {
      Object.entries(dependencies).forEach(([key, value]) => {
        const { version, resolved, integrity, dev, dependencies } = value;

        ++depth;

        if (dependencies) {
          walk(value, key, depth, name);
        } else {
          res[`${key}@${version}`] = {
            dev: !!dev,
            depth,
            name: key,
            version,
            resolved,
            integrity,
            parents: depth === 0 ? [] : [parentName],
          };
        }
      });
    }
  }

  Object.entries(dependencies).forEach(([moduleName, moduleData]) => {
    walk(moduleData, moduleName, 0, moduleName); // depth 0 is the root (./node_modules)
  });

  return res;
}
