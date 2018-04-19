## Question

We all know, that NodeJS _require_ works [like that](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders). But, what if we want NodeJS to prefer modules from `custom_folder`?

Say, we have:

```
custom_folder/
  foo.js
node_modules/
  foo.js
test/
  entry.js
  node_modules/
    foo.js
```

entry.js:

```js
console.log(require.resolve('foo')) // ?
```

And we want the lookup order to be

```
custom_folder/foo.js
test/node_modules/foo.js
node_modules/foo.js
```

Is that possible with NODE_PATH? Or something else?

```js
node questions/9.nodepath/test/entry.js
```

## Answer

Default resolve console.log is:

```
philosoraptor/questions/9.nodepath/test/node_modules/foo.js
```

NodeJS [require resolve algorythm](https://nodejs.org/dist/latest-v9.x/docs/api/modules.html#modules_all_together).

It suggest no solution, just `node_modules` chain (see NODE_MODULES_PATHS part).

NodeJS does not support `PATH`, but it has its own version – [NODE_PATH](https://nodejs.org/dist/latest-v9.x/docs/api/modules.html#modules_loading_from_the_global_folders). And the bad news is that it has lowerest priority for reasons:

> NODE_PATH was originally created to support loading modules from varying paths before the current module resolution algorithm was frozen.
> NODE_PATH is still supported, but is less necessary now that the Node.js ecosystem has settled on a convention for locating dependent modules. Sometimes deployments that rely on NODE_PATH show surprising behavior when people are unaware that NODE_PATH must be set. Sometimes a module's dependencies change, causing a different version (or even a different module) to be loaded as the NODE_PATH is searched.

So, the answer is: you can't.
