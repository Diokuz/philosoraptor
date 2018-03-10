self.addEventListener('install', function(event) {
  console.log('Root sw installed')
  self.skipWaiting()
})

this.addEventListener('activate', function(event) {
  console.log('Root sw activated')
})

self.addEventListener('fetch', function(event) {
  console.log('Root fetch interception')
})
