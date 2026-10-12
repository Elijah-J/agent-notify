self.addEventListener('push', event => {
  let notification;
  try {
    notification = event.data.json().notification;
    if (!notification || typeof notification.title !== 'string' || !notification.title.trim()) {
      throw new Error('Invalid notification');
    }
  } catch (error) {
    notification = {title: 'Agent notifications', body: 'Open the app to check this notification.', navigate: './index.html'};
  }
  event.waitUntil(self.registration.showNotification(notification.title, {
    body: notification.body,
    silent: notification.silent,
    data: {navigate: notification.navigate}
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.navigate));
});
