var title = document.getElementById('txt-title');
var content = document.getElementById('txt-content');

sidekick.store.set('notifications', notificationsData);

function addAlert() {

    
    console.log(`add alert ${title.value}: ${content.value}`);
    notificationsData.push({
        title: title.value,
        content: content.value,
        unread: true
    });

    sidekick.store.set('notifications', notificationsData);

    clearForm();
}

// handling the mark-as-read event
sidekick.events.on('notification.mark-as-read', (n) => {
    var notificationItem = notificationsData.find((i) => i === n);
    notificationItem.unread = false;// update the notification object
    console.log(`read ${n.title}`);

    sidekick.store.set('notifications', notificationsData);
    
});

// handling the delete event
sidekick.events.on('notification.delete', (n) => {
    notificationsData = notificationsData.filter(i => i !== n );
    console.log(`deleting ${n.title}`);
    sidekick.store.set('notifications', notificationsData);
    
});

// handling the action event
sidekick.events.on('notification.action', (n) => {
    console.log(`clicked on ${n.title}`);

});

function clearForm() {
    title.value = '';
    content.value = '';
}