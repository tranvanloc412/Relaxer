const container = document.getElementById('container');
const text = document.getElementById('text');
const audioContainer = document.getElementById('audio-container');
const audio = document.getElementById('audio');
const toggleBtn = document.querySelector('.toggle-button');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const audioTimeCurrent = document.querySelector('.audio-time-current');
const audioTimeTotal = document.querySelector('.audio-time-total');
const audioVolume = document.querySelector('.audio-volume-bar');
const audioVolumeLevel = document.querySelector('.audio-volume-level');

const totalTime = 8000;
const breatheTime = (totalTime / 5) * 2;
const holdTIme = totalTime / 5;

breathAnimation();

function breathAnimation () {
    text.innerText = 'Breathe In';
    container.className = 'container grow';
    setTimeout(() => {
        text.innerText = 'Hold';
        setTimeout(() => {
            text.innerText = 'Breath Out';
            container.className = 'container shrink';
        }, holdTIme);
    }, breatheTime);
}

setInterval(breathAnimation, totalTime);


    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCi8QgtX_qavgxZY1ZUf27K56Dy1_A8Nu4",
        authDomain: "relaxer1-73633.firebaseapp.com",
        databaseURL: "https://relaxer1-73633.firebaseio.com",
        projectId: "relaxer1-73633",
        storageBucket: "relaxer1-73633.appspot.com",
        messagingSenderId: "939537240854",
        appId: "1:939537240854:web:0727136e1f61ae94263637"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    function writeMessage(type, name, songUrl) {
            firebase.database().ref(`${type}/${name}`).set({
            Url: songUrl
        });
    };

    const uploader = document.getElementById('uploader');
    const fileButton = document.getElementById('fileButton');

    // Listen to file Selection
    fileButton.addEventListener('change', function(e) {
        // Get File
        const file = e.target.files[0];
        const fileType = file.name.split('.')[1];
        let audiosRef = null;
        let type = null, name = null; 

        // Create a storage ref
        const storageRef = firebase.storage().ref();

        if (fileType === 'jpg') {
            console.log('jpg 111');
            type = 'images';
            audiosRef = storageRef.child(`${type}`);
            name = file.name.split('.')[0];
        } else if (fileType === 'mp3') {
            console.log('mp3 1111');
            type = 'audios';
            audiosRef = storageRef.child('audios');
            name = file.name.split('.')[0];
        }
        
        const fileRef = audiosRef.child(file.name);

        const task = fileRef.put(file);

        task.on('state_changed', 
            function progress(snapshot) {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },
            function error(err) {
                switch (error.code) {
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                    // User canceled the upload
                        break;
                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                        break;
                };
            },
            function complete() {
                task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    const Url = downloadURL;
                    writeMessage(type, name, Url);
                });
            }
        );
    });
    const getURL = document.getElementById('testURL');
    getURL.addEventListener('click', () => {
        firebase.database().ref(`audios`).once('value').then(function(snapshot) {
            var username = snapshot.val();
            console.log(username);
        });

        firebase.database().ref('images').once('value').then(function(snapshot) {
            var username = snapshot.val();
            console.log(username);
        });
    });



function playAudio() {
    audioContainer.className = 'audio-container play';
    toggleBtn.innerHTML = '<i class="fa fa-pause"></i>';
    audio.play();
};

function pauseAudio() {
    audioContainer.className = 'audio-container';
    toggleBtn.innerHTML = '<i class="fa fa-play"></i>';
    audio.pause();
};

function updateProgress() {
    let percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percentage}%`;
};

function setProgress(e) {
    const duration = audio.duration;
    const width = this.clientWidth;
    const widthClick = e.offsetX;
    audio.currentTime = `${(widthClick / width) * duration}`;

};

function convertTime(duration) {
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

function updateTimer() {
    const timeTotal = audio.duration;
    const timeCurrent = audio.currentTime;
    audioTimeCurrent.innerText = `${convertTime(timeCurrent).minute}:${convertTime(timeCurrent).second}`;
    audioTimeTotal.innerText= `${convertTime(timeTotal).minute}:${convertTime(timeTotal).second}`;
};

audio.volume = 1;

function setVolumeLevel(e) {
    const width = this.clientWidth;
    const widthClick = e.offsetX;
    audio.volume = `${widthClick / width}`;
    if (audio.volume < 0.03) {
        audio.volume = 0;
    } else if (audio.volume > 0.97) {
        audio.volume = 1
    }
    audioVolumeLevel.style.width = `${audio.volume * 100}%`;

};

toggleBtn.addEventListener('click', () => {
    const isPlaying = audioContainer.classList.contains('play');
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

audio.addEventListener('timeupdate', () => {
    updateProgress();
    updateTimer();
});

progressContainer.addEventListener('click', setProgress);
audioVolume.addEventListener('click', setVolumeLevel);