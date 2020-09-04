import { elements } from '../views/base';
import axios from 'axios';

export default class Play {
    constructor() {
        this.playingSongId = 0
    };

    isPlaying() {
        if (elements.audioContainer.classList.contains('play')) {
            return true;
        } else {
            return false
        }
    };

    async loadSongsFromFirebase() {
        const link = 'https://relaxer1-73633.firebaseio.com/audios.json';
        try {
            const res = await axios.get(`${link}`);
            this.songs = res.data;
        } catch (e){
            alert(e);
        }
    };

    async loadImagesFromFirebase() {
        const link = 'https://relaxer1-73633.firebaseio.com/images.json';
        try {
            const res = await axios.get(`${link}`);
            this.images = res.data;
        } catch (e){
            alert(e);
        }
    };

    setPlayingSongId(id) {
        this.playingSongId = id;
    };
    
    nextSong() {
    const audio = document.getElementById(`audio-${this.playingSongId}`);
        if (audio.currentTime === audio.duration) {
            this.playingSongId++;
            console.log(this.playingSongId);
        }
    }
};

