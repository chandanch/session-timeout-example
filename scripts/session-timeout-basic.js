/**
 * @description Handles session on the browser
 * uses the javascript timeout API to handle sessions
 * @author chandanch
 * @annotated {false}
 */

var isSessionActive = false;
var startTimeout;
var idleTimeout;
var sessionTime = 6000;
var warnTime = 3000;
var idleTime = 7000;
$(document).ready(function () {

    // start the idle timer on page load
    startIdleTimer();
    // Detect user interaction via mouse move
    $(this).mousemove(function(event){
       $('#status').text('Active');
       clearTimeout(idleTimeout);
       sessionHandler();
   });

});

/**
 * @description Checks if the session is active or starts the session otherwise
 */
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

/**
 * @description shows prompt for session expiry
 */
function watchSession() {

   setTimeout(function () {
       showRenewPrompt();

   }, warnTime);
}

/**
 * @description shows prompt to renew session
 */
function showRenewPrompt() {
    var prompt = confirm('Do you want to renew session');
    console.log(prompt);
    if(prompt) {
       renewSession();
    }
    else {
        alert('Your session will expire soon');
        // show timer if not renewed
        displayTimer();
    }
}

/**
 * @description displays timer for session expiry
 * shows in seconds
 * @todo the style of the timer to be changed
 */
function displayTimer() {
    // Remaining time is calculated by session time - warntime
    var timeRemaining = sessionTime - warnTime;
    // update the remaining time for every second or 1000 milliseconds
    setInterval(function () {
        timeRemaining -= 1000;
        // shows the time in seconds instead of milliseconds
        $('#status-container').text('Session expires in: ' + timeRemaining/1000)
    }, 1000);
}

/**
 * @description start the user session
 */
function startSession() {

    // timer starts when the session is active
    startTimeout = setTimeout(function () {
        console.log('session');
        // redirect to logout after session times out
        logout();
    }, sessionTime);
    watchSession();
}

function renewSession() {
    clearTimeout(startTimeout);
    alert('Session renewed');
    startSession();
}

function logout() {
    window.location.href = "logout.html";
}

/**
 * @description handles idle time
 */
function startIdleTimer() {
    // start the idle timer
    idleTimeout = setTimeout(function () {
        // show prompt if the idle time is more than 7 seconds: user can now start the session or logout
        var prompt = confirm('Your session will expire now due to inactivity');
        // if user selects to start session
        if(prompt) {
            // clear `idletimer`
            clearTimeout(idleTimeout);
            // start the session
            sessionHandler();
        }
        else {
            logout();
        }
    }, idleTime)
}
