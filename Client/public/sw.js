self.addEventListener('push', event => {
  const data = event.data.json()
  console.log('New notification', data)
  const options = {
    body: data.body,
    icon: './alert-img.png'
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})

self.addEventListener('notificationclick', function (e) {
  var notification = e.notification
  var action = e.action

  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow('http://localhost:3000/app')
    notification.close()
  }
})