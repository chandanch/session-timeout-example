var isSessionActive = false;
var startTimeout;
$(document).ready(function () {

   $(this).mousemove(function(event){
       $('#status').text('Active');
       sessionHandler();
   });

});

function sessionHandler() {
    if(isSessionActive === false) {
        console.log('session is not active');
        isSessionActive = true;
        startSession();
    }
    else {
        console.log('session is active')
    }
}

function watchSession() {
    var warnTime = 3000;
   setTimeout(function () {
       showRenewPrompt();

   }, warnTime);
}

function showRenewPrompt() {
    var prompt = confirm('Do you want to renew session');
    console.log(prompt);
    if(prompt) {
        clearTimeout(startTimeout);
        startSession();
    }
    else {
    }
}

function startSession() {
    isSessionActive = true;
    var sessionTime = 6000;
    startTimeout = setTimeout(function () {
        console.log('session');
    }, sessionTime);
    watchSession();
}
