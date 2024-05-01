console.log("Welcome to Gaanafy");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Soulmate - Badshah", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {songName: "God Damn - Karan Aujla", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Joota Japani - KR$NA", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Woh Raat - Raftaar x $", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Pehle bhi main - Vishal Mishra", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Tum mere 2 - Fukra insaan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Love ya - Diljit Dosanjh", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Kuley Kuley - yo yo honey singh", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Jaaniye - Vishal mishra, Rashmeet kaur", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Khatta flow - seedhe maut", filePath: "songs/10.mp3", coverPath: "covers/10.webp"},
];

// Function to generate song items and fetch timestamps
const generateSongItems = () => {
    songItems.forEach((element, i) => {
        // Set cover image and song name
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

        // Create a temporary audio element to fetch the duration
        let tempAudio = new Audio();
        tempAudio.src = songs[i].filePath;
        tempAudio.addEventListener('loadedmetadata', () => {
            let duration = tempAudio.duration;
            let minutes = Math.floor(duration / 60);
            let seconds = Math.floor(duration % 60);
            // Update the timestamp for the corresponding song item
            let timestampSpan = element.getElementsByClassName('timestamp')[0];
            timestampSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
    });
};

// Call the function to generate song items and fetch timestamps
generateSongItems();

// Volume slider
let volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.min = 0;
volumeSlider.max = 100;
volumeSlider.value = 50; // Set initial volume to 50%
audioElement.volume = volumeSlider.value / 100;
document.querySelector('.bottom').insertBefore(volumeSlider, myProgressBar);

// Update volume when volume slider changes
volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value / 100;
});

window.addEventListener('load', function() {
    // Delay hiding the loading screen by 1 second (1000 milliseconds)
    setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.main-content').style.display = 'block';
    }, 1000);
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
