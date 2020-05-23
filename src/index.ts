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
  };
};

export function flattenPackageLockDeps(packageLock: PackageLock, options?: Options) {
  const res: ModulesList = {};
  const { dependencies } = packageLock;
  const { ignoreDev = false } = options || {};

  function walk(dep: Package, name: string, depth: number) {
    const { version, resolved, integrity, dev } = dep;

    if (ignoreDev && dev) {
      return;
    }

    res[`${name}@${version}`] = {
      dev: !!dev,
      depth,
      name,
      version,
      resolved,
      integrity,
    };

    if (dep.dependencies) {
      Object.entries(dep.dependencies).forEach(([key, value]) => {
        const { version, resolved, integrity, dev, dependencies } = value;

        ++depth;

        if (dependencies) {
          walk(value, name, depth);
        } else {
          res[`${key}@${version}`] = {
            dev: !!dev,
            depth,
            name: key,
            version,
            resolved,
            integrity,
          };
        }
      });
    }
  }

  Object.entries(dependencies).forEach(([moduleName, moduleData]) => {
    walk(moduleData, moduleName, 0); // depth 0 is the root (./node_modules)
  });

  return res;
}
