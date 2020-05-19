# flatten-package-lock-deps

[![npm](https://img.shields.io/npm/v/flatten-package-lock-deps.svg?style=flat-square)](https://www.npmjs.com/package/flatten-package-lock-deps)
[![Codecov](https://img.shields.io/codecov/c/github/hiroppy/flatten-package-lock-deps.svg?style=flat-square)](https://codecov.io/gh/hiroppy/flatten-package-lock-deps)

Flatten all dependencies in package-lock.json.

## Install

```sh
$ npm i flatten-package-lock-deps
```

## Usage

```javascript
import { flattenPackageLockDeps } from 'flatten-package-lock-deps';
import packageLock from './package-lock.json';

const list = flattenPackageLockDeps(packageLock);
```

## Development

```sh
$ npm i
$ npm test
```
