const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');
const shuffleButton = document.getElementById('shuffleButton');
const volumeControl = document.getElementById('volumeControl');
const playlist = document.getElementById('playlist');

let playlistData = [];
let currentTrackIndex = 0;
let isShuffleOn = false;

fileInput.addEventListener('change', handleFileSelect);
audioPlayer.addEventListener('ended', playNextTrack);
shuffleButton.addEventListener('click', toggleShuffle);
volumeControl.addEventListener('input', adjustVolume);

function handleFileSelect(event) {
    const files = event.target.files;
    for (const file of files) {
        const fileURL = URL.createObjectURL(file);
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.addEventListener('click', () => playTrack(fileURL));
        playlist.appendChild(listItem);
        playlistData.push({ name: file.name, url: fileURL });
    }
    playTrack(playlistData[0].url);
}

function playTrack(trackURL) {
    audioPlayer.src = trackURL;
    audioPlayer.load();
    audioPlayer.play();
}

function playNextTrack() {
    if (isShuffleOn) {
        currentTrackIndex = Math.floor(Math.random() * playlistData.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlistData.length;
    }
    playTrack(playlistData[currentTrackIndex].url);
}

function toggleShuffle() {
    isShuffleOn = !isShuffleOn;
    shuffleButton.style.backgroundColor = isShuffleOn ? 'green' : '#333';
}

function adjustVolume() {
    audioPlayer.volume = volumeControl.value;
}
