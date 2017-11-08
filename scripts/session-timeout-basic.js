var isSessionActive = false;
var startTimeout;
$(document).ready(function () {

   $(this).mousemove(function(event){
       $('#status').text('Active');
       sessionHandler();
   });

});

// Handle session
function sessionHandler() {
    // Check if the session is active
    if(isSessionActive === false) {
        console.log('session is not active');
        // if active set the session flag to true
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
       renewSession();
    }
    else {
        alert('Your session will expire soon');
    }
}

function startSession() {
    var sessionTime = 6000;
    startTimeout = setTimeout(function () {
        console.log('session');
        window.location.href = "logout.html";
    }, sessionTime);
    watchSession();
}

function renewSession() {
    clearTimeout(startTimeout);
    alert('Session renewed');
    startSession();
}
