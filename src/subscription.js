function urlBase64ToUint8Array(base64String) {
    // eslint-disable-next-line
    const padding = "=".repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const publicVapidKey=urlBase64ToUint8Array("***REMOVED***");

function sendSubscription(subscription,endpoint,auth) {
    console.log(subscription);
  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    }
  })
}

export function subscribeUser(endpoint,auth) {
    try{
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(function(registration) {
              if (!registration.pushManager) {
                console.log('Push manager unavailable.')
                return
              }
        
              registration.pushManager.getSubscription().then(function(existedSubscription) {
                if (existedSubscription === null) {
                  console.log('No subscription detected, make a request.')
                  registration.pushManager.subscribe({
                    applicationServerKey: publicVapidKey,
                    userVisibleOnly: true,
                  }).then(function(newSubscription) {
                    console.log('New subscription added.')
                    sendSubscription(newSubscription,endpoint,auth)
                  }).catch(function(e) {
                    if (Notification.permission !== 'granted') {
                      console.log('Permission was not granted.')
                    } else {
                      console.error('An error ocurred during the subscription process.', e)
                    }
                  })
                } else {
                  console.log('Existed subscription detected.')
                  sendSubscription(existedSubscription,endpoint,auth)
                }
              })
            })
              .catch(function(e) {
                console.error('An error ocurred during Service Worker registration.', e)
              })
          }
    } catch(e){
        console.log(e);
    }
}

export default subscribeUser;