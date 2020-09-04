import { elements } from './base';

export const showImage = (id, images) => {
    const imagesArr = Object.keys(images);
    elements.audioImage.src = images[imagesArr[id]].Url;
};

export const showInfo = (id, songsObj) => {
    const songs = Object.keys(songsObj);
    const song = songs[id];
    const artist = song.split('-')[0];
    const title = song.split('-')[1];
    elements.audioArtist.innerText = `${artist}`;
    elements.audioTitle.innerText = `${title}`;

};

export const audioPlay = (id) => {
    elements.audioContainer.className = 'audio-container play';
    elements.toggleBtn.innerHTML = '<i class="fa fa-pause"></i>';
    document.getElementById(`audio-${id}`).play();
};

export const initialVolume = (id) => {
    document.getElementById(`audio-${id}`).volume = 0.7;
    elements.audioVolumeLevel.style.width = `${0.7 * 100}%`;
};

export const audioPause = (id) => {
    elements.audioContainer.className = 'audio-container';
    elements.toggleBtn.innerHTML = '<i class="fa fa-play"></i>';
    document.getElementById(`audio-${id}`).pause();
};

export const updateProgress = (id) =>{
    const audio = document.getElementById(`audio-${id}`);
    let percentage = ((audio.currentTime / audio.duration) * 100);
    elements.progress.style.width = `${percentage}%`;
};

export const setProgress = (e, id) => {
    const audio = document.getElementById(`audio-${id}`);
    const duration = audio.duration;
    const width = elements.progressContainer.clientWidth;
    const widthClick = e.offsetX;
    audio.currentTime = `${(widthClick / width) * duration}`;
};

const convertTime = (duration) => {
    let second = (Math.floor(duration % 60)).toString();
    const minute = (Math.floor(duration / 60)).toString();

    if (second < 10) {
        second = '0' + second;
    };
    return {
        second: second,
        minute: minute
    };
};

export const updateTimer = (id) => {
    const audio = document.getElementById(`audio-${id}`);
    const timeTotal = audio.duration;
    const timeCurrent = audio.currentTime;
    elements.audioTimeCurrent.innerText = `${convertTime(timeCurrent).minute}:${convertTime(timeCurrent).second}`;
    elements.audioTimeTotal.innerText= `${convertTime(timeTotal).minute}:${convertTime(timeTotal).second}`;
};


export const toggleVolume = (id) => {
    const audio = document.getElementById(`audio-${id}`);
    //mute and up
    if (elements.volumeToggleBtn.className === 'audio-player-volume') {
        elements.volumeToggleBtn.className = 'audio-player-volume mute';
        elements.volumeToggleBtn.innerHTML = '<i class="fa fa-volume-mute"></i>';
        audio.volume = 0;
        elements.audioVolumeLevel.style.width = '0%';
    } else if (elements.volumeToggleBtn.className === 'audio-player-volume mute') {
        elements.volumeToggleBtn.className = 'audio-player-volume';
        elements.volumeToggleBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
        audio.volume = 1;
        elements.audioVolumeLevel.style.width = '100%';
    }
};

export const setVolumeLevel = (e, id) => {
    const audio = document.getElementById(`audio-${id}`);
    const width = elements.audioVolume.clientWidth;
    const widthClick = e.offsetX;
    audio.volume = `${widthClick / width}`;
    if (audio.volume < 0.03) {
        audio.volume = 0;
    } else if (audio.volume > 0.97) {
        audio.volume = 1
    };
    elements.audioVolumeLevel.style.width = `${audio.volume * 100}%`;
    if (audio.volume > 0) {
        elements.volumeToggleBtn.className = 'audio-player-volume';
        elements.volumeToggleBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
    }
};

export const showSongs = (songsObj) => {
    const songs = Object.keys(songsObj);
    songs.forEach((song, index) => {
        elements.songsList.insertAdjacentHTML('beforeend', `
             <span  class="listItem" id="${index}">
                    ${index}. ${song}
            </span>
        `);
        
    });
};  

export const loadAllSongs = (songsObj) => {
    const songs = Object.keys(songsObj);
    songs.forEach((song, index) => {
        const songUrl = songsObj[song].Url;
        elements.audioPlayHolder.insertAdjacentHTML('afterbegin', `
        <audio src="${songUrl}" id="audio-${index}"></audio>
        `);
    });
}

export const loadAudioById = (id, songsObj) => {
    const songs = Object.keys(songsObj);
    songs.forEach((__, index) => {
            audioPause(index);
            document.getElementById(`audio-${index}`).currentTime = 0;
    });
    audioPlay(id);
};
