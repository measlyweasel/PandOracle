function Song() {}
Song.prototype.title="";
Song.prototype.artist="";
Song.prototype.album="";
Song.prototype.art="";
Song.prototype.toString = function(){
    return this.title+"-"+this.artist+"["+this.album+"]";
}

var song = null;

$(document).ready(function() {
    var $downloadButton = $($.parseHTML('<div class="button btn_bg"><div class="text">Download</div></div>'));
    $downloadButton.click(downloadSong);
    $('#trackInfoButtons .buttons').append($downloadButton);
});

var downloadSong = function() {
    chrome.runtime.sendMessage({'can haz':'d url?'}, function(url) {
        var fileName = song.title+"-"+song.artist+"["+song.album+"]"+ ".mp4";
        // Chrome's 'download' attribute support is borked right now, so I'm dumping this in the console ... then copy, rename, pasta.
        console.log(fileName);

        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    });
}

var getSongMeta = function getSongMeta() {
	try {
		song = new Song();
		song.title = document.getElementsByClassName("songTitle")[0].text;
		song.artist = document.getElementsByClassName("artistSummary")[0].text;
		song.album = document.getElementsByClassName("albumTitle")[0].text;
		song.art = document.getElementsByClassName("playerBarArt")[0].src;
	} 
	catch(err) { }	
};

window.setInterval(getSongMeta,500);
