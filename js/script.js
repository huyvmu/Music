// let's select all required tag or elements

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar")


let musicIndex = 1;

window.addEventListener("load", () =>{
    loadMusic(musicIndex); // calling load music once window loaded
})

// load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

// play music function
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play()
}

// pause music function
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause()
}

// next music function
function nextMusic(){
    // increment of index by 1 here
    musicIndex ++;
    // if musicIndex > array length then musicIndex will be 1 so the first song will play 
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// prev music function
function prevMusic(){
    // decrement of index by 1 here
    musicIndex --;
    // if musicIndex < 1 then musicIndex will be array length so the last song will play 
    musicIndex < 1 ? musicIndex = musicIndex.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// play or music button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    // if isMusicPaused is true then call pauseMusic else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
});

// next music btn event
nextBtn.addEventListener("click", () => {
    nextMusic(); // calling next music function
});

// prev music btn event
prevBtn.addEventListener("click", () => {
    prevMusic(); // calling prev music function
});

//update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) =>{
    const currentTime = e.target.currentTime; //getting current time of song
    const duration = e.target.duration; //getting total duration of song
    let progressWidth = (currentTime / duration) *100;
    progressBar.style.width = `${progressWidth}%`;

    mainAudio.addEventListener("loadeddata", () =>{
        let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

        // update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
});