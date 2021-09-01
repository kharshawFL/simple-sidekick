// do stuff

var impersonation = false;
var gemCount = 0;

function something() {
    console.log('activity started');
    sidekick.events.emit('activity-indicator.visible', true);

    setTimeout(function () {
        console.log('activity stopped');
        sidekick.events.emit('activity-indicator.visible', false);
    }, 5000);

}

function toggleImpersonation() {
    impersonation = !impersonation;
    sidekick.events.emit('header.impersonation', impersonation);
    document.getElementById('btnImpersonate').innerText = (impersonation ? 'End Impersonation' : 'Impersonate');
}

function updateGem(addGemAmount) {
    gemCount += addGemAmount;
    sidekick.events.emit('gem-count', gemCount);
}