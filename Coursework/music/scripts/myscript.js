let trackNum, tracks, arts, trackArt, trackInfo, seekbar, seekTimer, shuffleButton, currentTrackArt;
let currentTrack = null;
	trackNum = -1;
let shuffle = false;

window.onload = function(){
	tracks = document.getElementsByClassName("track");
	arts = document.getElementsByClassName("art");
	trackArt = document.getElementById("trackArt");
	trackInfo = document.getElementById("trackInfo");
	seekbar = document.getElementById("seek");
    seekTimer = document.getElementById("seek_timer");
    shuffleButton = document.getElementById("shuffle_off");
	document.addEventListener('keydown', keypress);
	setInterval(updateSeek,10);
}

function playTrack(num){
	if(currentTrack!=null){
		currentTrack.pause();
        arts[trackNum].src = currentTrackArt;
	}
	trackNum = (num + tracks.length) % tracks.length;
	currentTrack = tracks[trackNum];
	trackArt.src = currentTrackArt = arts[trackNum].src;
    arts[trackNum].src = "art/playing.gif";
	currentTrack.currentTime = 0;
	trackInfo.innerHTML =  "Now playing: "+currentTrack.title;
	currentTrack.play();
}

function playOrPause(){
	if(currentTrack==null){
		next();
	} else if(currentTrack.paused) {
		currentTrack.play();
	} else {
		currentTrack.pause();
	}
}

function next(){
    if (shuffle) {
        playTrack(randomInt(tracks.length, trackNum));
    }else {
        playTrack(trackNum + 1);
    }
}

function prev(){
	playTrack(trackNum - 1);
}

function toggleShuffle() {
    shuffle = !shuffle;
    shuffleButton.id = (shuffle) ? "shuffle_on" : "shuffle_off";
}

function keypress(e){
	switch(e.key){
		case " ":
			playOrPause();
			break;
        case "ArrowLeft":
            prev();
            break;
        case "ArrowRight":
            next();
            break;
	}
}

function seek(event) {
	let percent = event.offsetX / event.target.offsetWidth;
	currentTrack.currentTime = percent * currentTrack.duration;
	event.target.value = percent * 100;
}

function updateSeek(){
	if(currentTrack!=null){
		seekbar.value = (100/currentTrack.duration) * currentTrack.currentTime;
        seekTimer.innerHTML =  formatSeekTime(currentTrack.currentTime) + "/" + formatSeekTime(currentTrack.duration);
	}
}

function formatSeekTime(time) {
    return Math.trunc(time / 60) + ":" + Math.trunc(time % 60);
}
function randomInt(max, prev) {
    if (prev != null) {
        let num;
        while (true) {
            num = Math.round(Math.random() * max)
            if (num != prev) {
                return num;
            }
        }
    }
    return Math.round(Math.random() * max);
}