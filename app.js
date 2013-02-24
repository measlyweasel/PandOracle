function Song(url){
	this.url = url;
}
Song.prototype.url = "";
Song.prototype.title="";
Song.prototype.artist="";
Song.prototype.album="";
Song.prototype.art="";
Song.prototype.toString = function(){
	return this.title+" - "+this.artist+"["+this.album+"]";
}

var songs = []

var notification = webkitNotifications.createNotification(
	"icon.png",
	"Title",
	"Body"
)

function downloadSong(song) {
	// var downloadLink = document.createElement('a');
	// downloadLink.href = song.url;
	// downloadLink.download = song.toString() + ".mp4";
	// var click = document.createEvent("MouseEvents");
	// click.initMouseEvent(
	// 	"click", true, false, self, 0, 0, 0, 0, 0
	// 	, false, false, false, false, 0, null
	// );
	// downloadLink.dispatchEvent(click);

	chrome.downloads.download(
		{
			url: song.url,
			filename: song.toString() + ".mp4",
			saveAs: true
		},
		function(downloadId){ }
	);

	notification.cancel();
}

function processSongMeta(songMeta){
	var songIndex = songs.length-1;
	songs[songIndex].title = songMeta.title;
	songs[songIndex].artist = songMeta.artist;
	songs[songIndex].album = songMeta.album;
	songs[songIndex].art = songMeta.art;

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
	function(songMeta,sender,sendResponse){
		processSongMeta(songMeta);
	}
);
