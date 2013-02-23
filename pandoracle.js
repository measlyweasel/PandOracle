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
			chrome.extension.sendMessage(song);
		}
	} 
	catch(err) { }	
};

window.setInterval(getSongMeta,500);

// chrome.extension.onMessage.addListener(
// 	function(request, sender, sendResponse){
// 		if (request.type == "songMeta"){
// 			console.log("meta request recieved")

// 			var meta = getSongMeta();
// 			sendResponse(meta)
// 		}
// 	}
// );