var url = null;

/* Watch for messages from browser to pandora and capture the song URL. */
chrome.webRequest.onResponseStarted.addListener(
    function(details) {
        url = details.url;
    },
    { 	
        urls: ["*://*.pandora.com/access/*"]
    }
);

/* Handle messages from pandoracle.js when the download button is clicked. */
/* send them the most recently captured song url */
chrome.extension.onMessage.addListener(
    function(msg,sender,sendResponse){
        sendResponse(url);
    }
);
