function Song(url){
	this.url = url;
}
Song.prototype.url = "";
Song.prototype.title="";
Song.prototype.artist="";
Song.prototype.album="";
Song.prototype.art="";
Song.prototype.tabId = 0;
Song.prototype.toString = function(){
	return this.title+" - "+this.artist+"["+this.album+"]";
}

var songs = [];
var tabId = 0;

var notification = webkitNotifications.createNotification(
	"icon.png",
	"Title",
	"Body"
)

function downloadSong(song) {

	if(chrome.downloads){
		chrome.downloads.download(
		{
			url: song.url,
			filename: song.toString() + ".mp4",
			saveAs: true
		},
		function(downloadId){ /*download callback*/	}
		);		
	} else { //no chrome download api
		var msg = {"type": "dl", "song":song};
		chrome.tabs.sendMessage(song.tabId,msg);
	}

	notification.cancel()
}

function processSongMeta(songMeta, tabId){
	var songIndex = songs.length-1;
	songs[songIndex].title = songMeta.title;
	songs[songIndex].artist = songMeta.artist;
	songs[songIndex].album = songMeta.album;
	songs[songIndex].art = songMeta.art;
	songs[songIndex].tabId = tabId;

	notification.cancel();
	notification = webkitNotifications.createNotification(
		songMeta.art,
		songMeta.title + " - " + songMeta.artist,
		"Download"
	);
	notification.onclick = function() { downloadSong(songs[songIndex]); }
	notification.show();
}

chrome.webRequest.onResponseStarted.addListener(
	function(details) {
		if(songs.length==0 || details.url!=songs[songs.length-1].url){
			songs.push(new Song(details.url));
		}
	},
	{ 	
		urls: ["*://*.pandora.com/access/*"]
	}
);

chrome.extension.onMessage.addListener(
	function(msg,sender,sendResponse){
		if(msg.type=="songMeta"){
			processSongMeta(msg.songMeta, sender.tab.id);
		}
	}
);
