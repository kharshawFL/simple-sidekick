// set up sidekick
sidekick.init({});

// enable the activity indicator
sidekick.store.set('activity-indicator', {});

// set up the left nav
sidekick.store.set('nav', {
  'menuItems': [{
      'title': 'Home',
      'url': '/',
      'icon': 'fa-nav-gem',
      'badgeEvent': 'gem-count'
    }, {
      'title': 'Item 2 /w Menu',
      'icon': 'fa-nav-chart-bar',
      'children': [
          { 'title': 'Sub 1',
            'children': [
              {'title':" Item 2 Sub 1 Child 1"},
              {'title':" Item 2 Sub 1 Child 2"},
            ]},
          { 'title': 'Sub 2' }
      ]
    }, {
      'title': 'Item 3 /w Menu',
      'icon': 'fa-nav-search',
      'children': [{
          'title': 'Sub 1',
          'children': [
              { 'title': 'Sub Sub 1' },
              { 'title': 'Sub Sub 2' }
          ]
      }, {
          'title': 'Sub 2',
          'children': [
              { 'title': 'Sub Sub 1' },
              { 'title': 'Sub Sub 2' }
          ]
      }]
  }, {
    'title': 'Notification',
    'url': '/notification',
    'icon': 'fa-li-window-alert'
  }]
});

sidekick.store.set('current-org', {
  id: '20001',
  name: 'KSD',
  phone: '(717) 555-1212',
  fax: '(717) 555-1213',
  contactName: 'Keith Harshaw',
  comments: 'Just some test orrg'
});

sidekick.store.set("help", {
  "articles": [{
    "title": "Help Me!",
    "url": "/help",
    "icon": "fa-file-text"
  },{
    "title": "Look in Console",
    "icon": "fa-nav-bolt"
  }],
  "blocks": [{
    "title": "feedback",
    "url": "/feedback",
    "icon": "fa-li-lightbulb"
  }, {
    "id": "livechat",
    "title": "live chat",
    "icon": "fa-li-chatbubbles"
  }]
});

// idm
sidekick.store.set('roles', {
  currentRole: 1,
  roles: [
    { id: 1, name: 'Teacher' },
    { id: 2, name: 'Admin' }
  ]
});

sidekick.events.on("header.user-info.role", function(role) {
  console.log(role.name, 'was clicked');
});
sidekick.events.on("header.user-info.account-settings", function() {
  console.log('settings');
});

sidekick.events.on("session.logout", function() { // event name differs from docs
  alert('logout');
});

// session timeout
sidekick.store.set('session-timeout', {
  timer: 30
});

sidekick.events.on("session.logout", function() {
  console.log('logout was clicked');
  event.emit("session-timeout.clear");
});

sidekick.events.on("session.extend", function() {
  alert('stay logged in');

  console.log('stay signed in was clicked');
});


sidekick.events.emit("session-timeout.clear");


// sidekick search

var searchResult = [];

sidekick.store.set('search', {
  limit: 10,
  placeHolderText: 'Search Nobel Prizes, try `p`'
});

sidekick.events.on('header.search', (searchTerm) => {

  searchResult = noble.prizes.filter(p => p.year == searchTerm || p.category.startsWith(searchTerm));

  var resultHtml = searchResult.map(r => `${r.year} - ${r.category}`);

  sidekick.events.emit('header.search.results', resultHtml);
});

sidekick.events.on('header.search.item-clicked', idx => {
  // bail out if this result doesn't exist
  console.log(`search result: ${idx}\r${searchResult[idx]}`);


  if (searchResult[idx]) {
    alert(JSON.stringify(searchResult[idx]));
  }


  var { year, category } = searchResult[idx];

  window.location.href = `/laureates?year=${year}&category=${category}`;

});

// notification set up
var notificationsData = [{
    title: 'this is a notification',
    content: 'something amazing has happened!',
    unread: true,
    timestamp: 'Today'
}, {
    title: 'this is another notification',
    content: 'something super has happened!',
}];

// sidekick help

sidekick.events.on("header.help.article.click", function(a) {
  console.log(a.title + " was clicked.");
});
sidekick.events.on("header.help.block.click", function(b) {
  console.log(b.title + " was clicked.");
  if (b.id === 'livechat') {
    alert('chat!')
  }
});

sidekick.store.set("user-data", {
firstName: "Joe",
lastName: "Developer",
// showAcctSettings: true,  // defaults to true
// showSignOut: true	// defaults to true
});



sidekick.store.set('org-switcher-data', {
currentOrg: '1234',
orgs: [{
  id: '1234',
  name: 'Test Org 1'
}, {
  id: '2354',
  name: 'Test Org 2'
}]
});

sidekick.events.on("header.org-switcher.change", (o) => {
console.log(`OrgSwitcher: ${JSON.stringify(o)}`);
});

sidekick.store.set('app-switcher-data', {
currentApp: 'APPID1',
apps: [{
  id: 'APPID1',
  name: 'Application 1',
  //url: 'http://somewhere.com/dashboard/'
}, {
  id: 'APPID2',
  name: 'Application 2',
  //url: 'http://somewhereelse.com/dashboard/'
}]
});

sidekick.events.on("header.app-switcher.change", (a) => {
console.log(`OrgSwitcher: ${JSON.stringify(a)}`);
});