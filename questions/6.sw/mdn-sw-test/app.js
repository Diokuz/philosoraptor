// register service worker

// Q1
const appVersion = Math.random() // wil be a string handcoded on server
// If appVersion is old and/or current app has critical bug/exploit, server will respond with `you must reload the page ASAP`
const mustReload = false // await fetch(`/should_reload?appVersion=${appVersion}`).then(res => res.body)

if (mustReload) {
  // Danger place. If cached version from old `sw` will be loaded – youll get an infinity loop
  // @todo clear `sw` caches here
  location.reload(true)
}

// After reload appVersion will change

if ('serviceWorker' in navigator) {
  // Q6
  // navigator.serviceWorker
  //     .register(`/sw.js?appVersion=${appVersion}`, { scope: '/' })

  // Q1
  // If the page was reloaded and appVersion have been changed,
  // Or this is the first page load
  // new sw will be loaded
  // Otherwise – nothing happens (even if browser kill sw cache – byte-to-byte check will pass)
  navigator.serviceWorker
    .register(`/mdn-sw-test/sw.js?appVersion=${appVersion}`, { scope: '/mdn-sw-test/' })
    .then(function(reg) {

      if(reg.installing) {
        console.log('Service worker installing');
      } else if(reg.waiting) {
        console.log('Service worker installed');
      } else if(reg.active) {
        console.log('Service worker active');
      }

      setInterval(() => {
        reg.update()
      }, 1000 * 60 * 60 * 5) // Update `sw` each 5 hours

    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });

  // Q6
  // setTimeout(() => {
  //   navigator.serviceWorker
  //     .register(`/sw.js?appVersion=${appVersion}`)
  // }, 1000)
}

document.write('document writed here! (JS is running)')
