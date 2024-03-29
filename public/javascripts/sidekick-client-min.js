sidekick.init({}) ;

var orgSwitcherData = {
    currentOrg: '1234',
    orgs: [{
      id: '1234',
      name: 'Test Org 1'
    }, {
      id: '2354',
      name: 'Test Org 2'
    }]
};

function toggleOrgSwitcher() {
    sidekick.store.set('org-switcher-data', orgSwitcherData);
};

sidekick.events.on("header.org-switcher.change", (o) => {
    console.log(`OrgSwitcher: ${JSON.stringify(o)}`);

    orgSwitcherData.currentOrg = o.id;
    sidekick.store.set('org-switcher-data', orgSwitcherData);
    //alert(`Welcome to org ${o.name}`);
});


// App switcher
var appSwitcherData = {
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
};

function toggleAppSwitcher() {

    sidekick.store.set('app-switcher-data', appSwitcherData);
};

sidekick.events.on("header.app-switcher.change", (a) => {
    console.log(`OrgSwitcher: ${JSON.stringify(a)}`);
    appSwitcherData.currentApp = a.id;
    sidekick.store.set('app-switcher-data', appSwitcherData);
    //alert(`Welcome to app ${a.name}`);
});

var menuData = {
    'menuItems': [{
        'title': 'Home',
        'url': '/',
        'icon': 'fa-nav-gem',
        'badgeEvent': 'gem-count'
    }, {
        'title': 'Nested Menu',
        'icon': 'fa-nav-chart-bar',
        'children': [
            { 'title': 'Child 1',
            'children': [
                {'title':" Grandchild 1"},
                {'title':" Grandchild 2"},
            ]},
            { 'title': 'Child 2' }
        ]
    }, {
        'title': 'Super Menu',
        'icon': 'fa-nav-search',
        'children': [{
            'title': 'Child 1',
            'children': [
                { 'title': 'Grandchild 1' },
                { 'title': 'Grandchild 2' }
            ]
        }, {
            'title': 'Child 2',
            'children': [
                { 'title': 'Grandchild 3' },
                { 'title': 'Grandchild 4' }
            ]
        }]
    }, {
    'title': 'Notification',
    'url': '/notification',
    'icon': 'fa-li-window-alert'
    }, {
        'title': 'Minimal Page',
        'url': '/min',
        'icon': 'fa-nav-tachometer'
    }]
}

function toggleMenu() {
    // set up the left nav
    sidekick.store.set('nav', menuData);
}

function toggleHelp() {
    
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

    sidekick.events.on("header.help.article.click", function(a) {
        console.log(a.title + " was clicked.");
      });
      sidekick.events.on("header.help.block.click", function(b) {
        console.log(b.title + " was clicked.");
        if (b.id === 'livechat') {
          alert('chat!')
        }
      });
}