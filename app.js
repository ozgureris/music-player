const container = document.querySelector('.container');
const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const prev = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const duration = document.querySelector('#duration');
const currentTime = document.querySelector('#current-time');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
const ul = document.querySelector('ul');


const player = new MusicPlayer(musicList);

window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isMusicPlaying();
});

const displayMusic = (music) =>{
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "Images/" + music.img
    audio.src = "Musics/" + music.file;
}

next.addEventListener('click', () =>{
    nextMusic();
});

prev.addEventListener('click', () =>{
    prevMusic();
});

const nextMusic = () =>{
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isMusicPlaying();
};

const prevMusic = () =>{
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isMusicPlaying();
};

play.addEventListener('click', () =>{
    const isMusicPlay = container.classList.contains('playing');
    isMusicPlay ? pauseMusic() : playMusic();
});

const playMusic = () =>{
    container.classList.add('playing');
    play.querySelector('i').classList = "fa-solid fa-pause";
    audio.play();
};

const pauseMusic = () =>{
    container.classList.remove('playing');
    play.querySelector('i').classList = "fa-solid fa-play";
    audio.pause();
};

const calculateTime = (totalSecond) =>{
    const minute = Math.floor(totalSecond / 60);
    const second = Math.floor(totalSecond % 60);
    const currentSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}:${currentSecond}`;
    return result;
};

audio.addEventListener('loadedmetadata', () =>{
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener('timeupdate', () =>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener('input', () =>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let muteState = "unmuted";
let prevVolume;
let prevBar;

volumeBar.addEventListener('input', (e) =>{
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0){
        audio.muted = true;
        muteState = "muted"
        volume.classList = ('fa-solid fa-volume-xmark');
    }else{
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
    prevVolume = volume;
});

volume.addEventListener('click', () =>{

    if(muteState === "unmuted"){
        prevBar = volumeBar.value;

        audio.muted = true;
        muteState = "muted"
        volume.classList = ('fa-solid fa-volume-xmark');
        volumeBar.value = 0;
    }
    else{
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = prevBar;
    }
});

const displayMusicList = (list) =>{
    for(let i = 0; i < list.length; i++){
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="Musics/${list[i].file}"></audio>
            </li>
        `;

        ul.insertAdjacentHTML('beforeend', liTag);


        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () =>{
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });

    }
};

const selectedMusic = (li) =>{
    player.index = li.getAttribute('li-index');
    displayMusic(player.getMusic());
    playMusic();
    isMusicPlaying();
};

const isMusicPlaying = () =>{
    for(let li of ul.querySelectorAll('li')){
        if(li.classList.contains('playing')){
            li.classList.remove('playing');
        }
        
        if(li.getAttribute('li-index') == player.index){
            li.classList.add('playing');
        }
    }
};


audio.addEventListener('ended', () =>{
    nextMusic();
})