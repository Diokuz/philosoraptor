'use strict'

## Q1: How to kill cash?
Example: you have app.ver1.js + sw in cache, and 5 minutes later you released app.ver2.js, because app1 has critical bug.
How sw can handle that in less than 24 hours?

Looks like this is a big problem for now. Many people recommends to set http header max-age to 0, but what if I have no access to server/nginx?

Google confirms – [updating the service worker](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#updates) is a problem. For now you have the following options:

1. Change sw url (make non-cachable request for current app version and add it as a GET param)
2. Disable http cache for sw url on server (that will be fixed in the future)
3. Wait for 24 hours. Who invented that number? Failed to find it in the spec.
4. Call self.skipWaiting to activate new installed sw.

App version as GET param works! But you have to press `cmd` + `r` twice: the first page update will reload sw, and sw will reload cache. The second page update will load assets from cache.

`tldr`: make a non-cachable request to `server/should_i_reload_the_page?appVersion={myVersion}` on every page load (and maybe each several hours)? If yes, force-reload the page. If critical bug was there, server responds with `reload!` for any non-actual appVersion. If no, (re)load the `/sw.js?appVersion={myVersion}`.

For static server the only solution is `max-age=0`.

## Q2: How to make any SPA route accesible when offline?

Just check `request.url`. If it matches known urls somehow, respond with any cached url you like: `respondWith(caches.match('/cached-url/'))`.

## Q3:
> It is only activated when there are no longer any pages loaded that are still using the old service worker
How that works? What if I forgot one tab to close – will it cache sw forever? app.js?

Instant reactivation:
1) ServiceWorkerGlobalScope.skipWaiting() (starts reactivation immediately)
self.addEventListener('install', function(event) {
  self.skipWaiting()
})

Instant controlling of tabs without `sw`
2) Clients.claim() (activation for old uncontrolled tabs)
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

So, `sw` could be hard (re)activated. Also, both `sw` and `app` could be hard reloaded (see Q1).

## Q4: I bought example.com. How can I be sure, there is no cached sw.js (man in the middle, actually) from previous owner?

You can wait for 24 hours.

## Q5: How to kill caches when online? i.e. how to use cache only when offline?

Easy! Just check [navigator.onLine](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine) and, if true, dont use cache. Plus cache-killers for assets.

## Q6: What if I have worker /sw.js and /subroute/sw.js and register them both – who will win?

More specific (`/subroute/sw.js`) `sw` always wins regardless of register/install/activation order.

## Q7: How to pass request to native browser net handler? fetch API fails to load chrome extensions.

That was easy, man. Just dont call event.respondWith.

## Good reading

https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
