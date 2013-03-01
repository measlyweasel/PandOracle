function Song() {}
Song.prototype.title="";
Song.prototype.artist="";
Song.prototype.album="";
Song.prototype.art="";
Song.prototype.toString = function(){
	return this.title+"-"+this.artist+"["+this.album+"]";
}

var prevSong = new Song();

var getSongMeta = function getSongMeta() {
	try {
		var song = new Song();
		song.title = document.getElementsByClassName("songTitle")[0].text;
		song.artist = document.getElementsByClassName("artistSummary")[0].text;
		song.album = document.getElementsByClassName("albumTitle")[0].text;
		song.art = document.getElementsByClassName("playerBarArt")[0].src;

		if(song.toString() != prevSong.toString()
			&& song.art != prevSong.art) {
			prevSong = song
			var msg  = {"type":"songMeta", "songMeta": song};
			chrome.extension.sendMessage(msg);
		}
	} 
	catch(err) { }	
};

window.setInterval(getSongMeta,500);


function addDownloadLink(song){
	var downloadLink = document.createElement('a');
	downloadLink.href = song.url;
	downloadLink.download = song.title+"-"+song.artist+"["+song.album+"]"+ ".mp4";
	var click = document.createEvent("MouseEvents");
	click.initMouseEvent(
		"click", true, false, self, 0, 0, 0, 0, 0
		, false, false, false, false, 0, null
	);
	downloadLink.dispatchEvent(click);
}

chrome.extension.onMessage.addListener(
	function(msg,sender,sendResponse){
		if(msg.type == "dl"){
			addDownloadLink(msg.song);
		}		
	}
);