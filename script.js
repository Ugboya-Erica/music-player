const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music 
const songs = [
    {
        name: 'unknown1',
        displayName: "That's What Friends Are For",
        artist: 'Dionne Warwick',
    },
    {
        name: 'unknown2',
        displayName: 'The Gambler',
        artist: 'Kenny Rogers',
    }, 
    {
        name: 'unknown5',
        displayName: "I've Got You Babe",
        artist: 'Lucky Dube',
    },
    {
        name: 'unknown4',
        displayName: 'I Will Survive',
        artist: 'Gloria Gaynor',
    },
    {
        name: 'unknown3',
        displayName: 'One More Night',
        artist: 'Busy Signal',
    },
];

//check if playing
let isPlaying = false;

//play
function playSong() {
    isPlaying =true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

//pause
function pauseSong(){
    isPlaying =false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

//event listener (play/pause)
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


//upadte Dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//curent song
let songIndex = 0;

//previous song
function prevSong() { 
    songIndex++;
    if(songIndex < 0 ){
        songIndex = songs.length -1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//onload
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
      const { duration, currentTime } = e.srcElement;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
  
// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}
  

//event listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);