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

type ModulesList = {
  [key in string]: {
    depth: number;
    name: string;
    version: string;
    resolved: string;
    integrity: string;
  };
};

export function flattenPackageLockDeps(packageLock: PackageLock) {
  const res: ModulesList = {};
  const { dependencies } = packageLock;

  function walk(dep: Package, name: string, depth: number) {
    const { version, resolved, integrity } = dep;

    res[`${name}@${version}`] = {
      depth,
      name,
      version,
      resolved,
      integrity,
    };

    if (dep.dependencies) {
      Object.values(dep.dependencies).forEach((value) => {
        if (value.dependencies) {
          walk(value, name, ++depth);
        }
      });
    }
  }

  Object.entries(dependencies).forEach(([moduleName, moduleData]) => {
    walk(moduleData, moduleName, 0); // depth 0 is the root (./node_modules)
  });

  return res;
}
