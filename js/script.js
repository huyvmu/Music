// let's select all required tag or elements

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar");


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
    
    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () =>{
        // update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10){ // adding 0 if sec < 10
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;

    });
    
    // update playing song current time

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10){ // adding 0 if sec < 10
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//update playing song current time arcording to the progress bar width
progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth; // getting width of progress bar
    let clickedOffSetX = e.offsetX; // getting offset x value
    let songDuration = mainAudio.duration; // getting song total duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

// work on repeat and suffle song according to the icon
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    // first ger the innerText of the icon then we'll change accordingly
    let getText = repeatBtn.innerText;
    // let's do different changes on different icon click using switch
    switch(getText){
        case "repeat": // if this icon is repeat
            repeatBtn.innerText = "repeat_one";
            break;
        case "repeat_one": // if this icon is repeat_one then change it to shuffle  
            repeatBtn.innerText = "shuffle";
            break;
        case "shuffle": // if this icon is shuffle then change it to repeat  
            repeatBtn.innerText = "repeat";
            break;
    }
});