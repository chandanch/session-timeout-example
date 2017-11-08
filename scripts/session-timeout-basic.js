var isSessionActive = false;
var startTimeout;
var sessionTime = 6000;
var warnTime = 3000;
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
        displayTimer();
    }
}

function displayTimer() {
    var timeRemaining = sessionTime - warnTime;
    setInterval(function () {
        timeRemaining -= 1000;
        //timeRemaining = timeRemaining/1000
        $('#status-container').text('Session expires in: ' + timeRemaining/1000)
    }, 1000);
}

function startSession() {

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
