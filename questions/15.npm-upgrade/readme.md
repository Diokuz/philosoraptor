## Question

How to upgrade a dependency to its latest version with yarn?

## Answer

The simple answer is [yarn upgrade](https://yarnpkg.com/lang/en/docs/cli/upgrade/), but that is only updates your lock file, and works only for version range from `package.json`.

Another simple answer is [npm-check-updates](https://www.npmjs.com/package/npm-check-updates).

Great tool is [upgrade-interactive](https://yarnpkg.com/lang/en/docs/cli/upgrade-interactive/) – works like `npm check` but you dont have to install any package.

To upgrade and change package.json:

```bash
yarn upgrade-interactive --latest
```
