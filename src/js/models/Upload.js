import { elements } from '../views/base';
import { firebaseConfig } from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

let audiosRef = null;
let type = null;
const storageRef = firebase.storage().ref();

const writeMessage = (type, name, songUrl) => {
    firebase.database().ref(`${type}/${name}`).set({
        Url: songUrl
    });
};

export default class Upload {
    constructor() {
        this.songs = null;
    };

    storeFile(file) {
        const fileType = file.name.split('.')[1];
        const fileName = file.name.split('.')[0];

        if (fileType === 'jpg') {
            console.log('jpg 111');
            type = 'images';
            audiosRef = storageRef.child(`${type}`);
            name = fileName;
        } else if (fileType === 'mp3') {
            console.log('mp3 1111');
            type = 'audios';
            audiosRef = storageRef.child(`${type}`);
            name = fileName;
        };

        const fileRef = audiosRef.child(file.name);
        const task = fileRef.put(file);
    
        task.on('state_changed', 
            function progress(snapshot) {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                elements.uploader.value = percentage;
            },
            function error(err) {
                switch (err.code) {
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
                    console.log(Url);
                    writeMessage(type, name, Url);
                });
            }
        );
    };
};
