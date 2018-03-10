// Q1
// For each appVersion cache will be reloaded
const appVersion = Math.random()
console.log('appVersion', appVersion);

self.addEventListener('install', function(event) {
  // Q3
  // Dont wait for old tabs to be closed, reactivate `sw` now (after waitUntil actually)
  self.skipWaiting() // waitUntil and skipWaiting are different waitings :)

  console.log('Subroute sw is installing', appVersion)
  event.waitUntil(
    caches.open(appVersion).then(function(cache) {
      return cache.addAll([
        '/mdn-sw-test/',
        '/mdn-sw-test/style.css',
        '/mdn-sw-test/app.js',
      ])
    })
  )
})

this.addEventListener('activate', function(event) {
  console.log('Subroute sw is activating', appVersion)

  event.waitUntil(
    caches.keys()
      .then(keyList => keyList.filter((key) => key !== appVersion))
      .then((keyList2remove) =>
        Promise.all(
          keyList2remove.map((key) => caches.delete(key))
        )
      )
  )
})

self.addEventListener('fetch', function(event) {
  console.log('Subroute sw fetch interception', appVersion)

  if (event.request.mode === 'navigation') {
    // @todo appshell
  }

  // Q7
  // Workaround for chrome-extension://
  if (event.request.url.indexOf('http') !== 0) {
    return
  }

  // Q2
  // Offline access for non-cached pages
  // Usefull for SPA
  if (!navigator.onLine) {
    const url = new URL(event.request.url);

    // You can match url for an array of known paths, or for regexp. Any logic here.
    if (url.origin == location.origin && url.pathname == '/mdn-sw-test/inner_page') {
      event.respondWith(caches.match('/mdn-sw-test/'))

      return
    }
  }

  event.respondWith(async function() {
    // Q5
    // Use cache only when offline
    if (!navigator.onLine) {
      // Try to get the response from a cache.
      const cachedResponse = await caches.match(event.request)

      // Return it if we found one.
      if (cachedResponse) {
        return cachedResponse
      }
    }

    // If we didn't find a match in the cache, use the network.
    const response = await fetch(event.request)
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    const responseClone = response.clone()
    const cache = await caches.open(appVersion)

    cache.put(event.request, responseClone)

    return response
  }())
})
