export const elements = {
    //container
    container : document.getElementById('container'),
    
    // text circle
    text : document.getElementById('text'),

    // Audio PLayer
    audioContainer: document.getElementById('audio-container'),
    audioPlayHolder: document.querySelector('.audio-player-holder'),
    audioImage: document.getElementById('audio-image'),
    // Audio Info
    audioArtist: document.querySelector('.audio-player-artist'),
    audioTitle: document.querySelector('.audio-player-title'),
    // Audio PLayer Button
    toggleBtn: document.querySelector('.toggle-button'),

    // Audio PLayer Progress
    progress: document.getElementById('progress'),
    progressContainer: document.getElementById('progress-container'),

    // Audio PLayer Time
    audioTimeCurrent: document.querySelector('.audio-time-current'),
    audioTimeTotal: document.querySelector('.audio-time-total'),
    audio: document.getElementById('audio'),

    // Audio PLayer Volume
    audioVolume: document.querySelector('.audio-volume-bar'),
    audioVolumeLevel: document.querySelector('.audio-volume-level'),
    volumeToggleBtn: document.querySelector('.audio-player-volume'),

    //songs
    songsList: document.querySelector('.songsList'),
    listItem: document.querySelector('.listItem'),

    //upload Files
    uploadContainer: document.querySelector('.upload-audio'),
    uploader: document.getElementById('uploader'),
    fileButton: document.getElementById('fileButton'),
    getURL: document.getElementById('testURL'),
    uploadToggle: document.querySelector('.toggle-upload')
}