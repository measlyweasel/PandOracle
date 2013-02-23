function Song(url){
	this.url = url;
}
Song.prototype.url = "";
Song.prototype.title="";
Song.prototype.artist="";
Song.prototype.album="";
Song.prototype.art="";
Song.prototype.toString = function(){
	return this.title+"-"+this.artist+"["+this.album+"]";
}

var songs = []

var notification = webkitNotifications.createNotification(
	"icon.png",
	"Title",
	"Body"
)

function processSongMeta(songMeta){

	songs[songs.length-1].title = songMeta.title;
	songs[songs.length-1].artist = songMeta.artist;
	songs[songs.length-1].album = songMeta.album;
	songs[songs.length-1].art = songMeta.art;

	notification.cancel();
	notification = webkitNotifications.createNotification(
		songMeta.art,
		songMeta.title + " - " + songMeta.artist,
		"Download"
	);
	notification.show();
}

chrome.webRequest.onResponseStarted.addListener(
	function(details) {
  		console.log("completed: " + details);
		console.log("completed: " + details.url);

		songs.push(new Song(details.url));
	},
	{ 	
		urls: ["*://*.pandora.com/access/*"]
	}
);

chrome.extension.onMessage.addListener(
	function(songMeta,sender,sendResponse){
		processSongMeta(songMeta);
	}
);
