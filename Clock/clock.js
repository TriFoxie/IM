let tickSound, muteIcon;
const sec = document.getElementById('sec');
    min = document.getElementById('min');
    hour = document.getElementById('hour');

window.onload = function() {
    tickSound = document.getElementById('tick');
    muteIcon = document.getElementById('mute_icon');
}

function update() {
    const now = new Date();
    const s = now.getSeconds() + (now.getMilliseconds()/999);
    const m = now.getMinutes() + (s/60);
    const h = now.getHours() + (m/60);

    sec.style.transform = `rotate(${s/60}turn)`;
    min.style.transform = `rotate(${m/60}turn)`;
    hour.style.transform = `rotate(${h/12}turn)`;
}

function toggleSound() {
    if (tickSound.paused) {
        tickSound.play();
        muteIcon.src = 'Assets/Images/unmute.svg';
    }else{
        tickSound.pause();
        muteIcon.src = 'Assets/Images/mute.svg';
    }
}

update();
setInterval(update, 10);