chrome.webRequest.onCompleted.addListener(
	function(details) {
  		console.log("completed: " + details);
		console.log("completed: " + info.url);
	},
	{ 	
		urls: ["*://*.pandora.com/access/*"]
		//types: ['xmlhttprequest']
	}
);