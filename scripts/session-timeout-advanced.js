var SessionManager = function() {
    // Private Variables
        // Session timeout after 7 seconds
         var sessionTimeoutSeconds = 7,
        // Prompt shows for 5 minutes
        promptSeconds = 3,
        countdownSeconds = 4,
        secondsBeforePrompt = sessionTimeoutSeconds - countdownSeconds,
        $dlg,
        displayCountdownIntervalId,
        promptToExtendSessionTimeoutId,
        originalTitle = document.title,
        extendSessionUrl = '../index.html',
        expireSessionUrl = '../logout.html';

    // Private Functions
    var endSession = function() {
        //$dlg.dialog('close');
        location.href = expireSessionUrl;
    };

    var displayCountdown = function() {
        var countdown = function() {
            var cd = new Date(count * 1000),
                // Get the minutes
                minutes = cd.getUTCMinutes(),
                // Get the seconds
                seconds = cd.getUTCSeconds();
            // Update the HTML title
            document.title = 'Expire in ' + minutes + ':' + seconds;
            $('#sm-countdown').html(minutes + ':' + seconds);
            if (count === 0) {
                document.title = 'Session Expired';
                endSession();
            }
            count--;
        };
        countdown();
        displayCountdownIntervalId = window.setInterval(countdown, 1000);
    };

    var promptToExtendSession = function() {
        var prompt = confirm('Do you want to extend session');
        if(prompt) {
            refreshSession();
        }
        else {
            endSession(false);
        }
        // Set our counter
        count = promptSeconds;
        //displayCountdown();
    };

    var refreshSession = function() {
        alert('Your session is renewed');
        window.clearInterval(displayCountdownIntervalId);

        window.clearTimeout(promptToExtendSessionTimeoutId);
        startSessionManager();
    };

    // Start the session
    var startSessionManager = function() {
        promptToExtendSessionTimeoutId = window.setTimeout(promptToExtendSession, secondsBeforePrompt * 1000);
    };

    // Public Functions
    return {
        start: function() {
            startSessionManager();
        },

        extend: function() {
            refreshSession();
        }
    };
}();
SessionManager.start();
