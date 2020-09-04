import Circle from "./models/Circle";
import Upload from "./models/Upload";
import Play from "./models/Play";

import * as circleView from "./views/circleView";
import * as playView from "./views/playView";

import { elements } from "./views/base";

const state = {};

// ----------Circle-----------------

function breathAnimation() {
  // setting breath time
  const totalTime = 8000;
  state.circle = new Circle(totalTime);
  /// Animation
  circleView.circleGrow();
  setTimeout(() => {
    circleView.circleHold();
    setTimeout(() => {
      circleView.circleShrink();
    }, state.circle.holdTIme);
  }, state.circle.breatheTime);
}

breathAnimation();
setInterval(breathAnimation, state.circle.totalTime);

//------------Audio Play-------------

//Handling Play toggle btn
elements.toggleBtn.addEventListener("click", () => {
  if (state.play.isPlaying()) {
    playView.audioPause(state.play.playingSongId);
  } else {
    playView.audioPlay(state.play.playingSongId);
  }
});

// Set Volume
elements.audioVolume.addEventListener("click", (e) =>
  playView.setVolumeLevel(e, state.play.playingSongId)
);
// toggle Volume
elements.volumeToggleBtn.addEventListener("click", () =>
  playView.toggleVolume(state.play.playingSongId)
);
// Set Progress
elements.progressContainer.addEventListener("click", (e) =>
  playView.setProgress(e, state.play.playingSongId)
);

const playViewInit = (songsObj) => {
  playView.loadAllSongs(songsObj);
  playView.showSongs(songsObj);
};

const updateProgressAndTimer = () => {
  const audio = document.getElementById(`audio-${state.play.playingSongId}`);
  audio.addEventListener("timeupdate", () => {
    playView.updateProgress(state.play.playingSongId);
    playView.updateTimer(state.play.playingSongId);
    if (audio.currentTime === audio.duration) {
      state.play.nextSong();
      loadNewSong();
    }
  });
};

const loadNewSong = () => {
  document.removeEventListener("timeupdate", () => {});
  playView.showImage(state.play.playingSongId, state.play.images);
  playView.loadAudioById(state.play.playingSongId, state.play.songs);
  playView.showInfo(state.play.playingSongId, state.play.songs);
  // Update Progress and Timer
  updateProgressAndTimer();
};

//songs
const loadSongs = async () => {
  state.play = new Play();
  try {
    state.play.setPlayingSongId(0);

    // Images
    await state.play.loadImagesFromFirebase();
    // playView.showImage(state.play.playingSongId, state.play.images);

    // Songs
    await state.play.loadSongsFromFirebase();
    playViewInit(state.play.songs);
    // playView.audioPlay(state.play.playingSongId);

    // set initial volume
    playView.initialVolume(state.play.playingSongId);
    loadNewSong();
    return true;
  } catch (e) {
    alert(e);
  }
};

const playSelectedSong = (e) => {
  const id = parseInt(e.target.getAttribute("id"));
  state.play.setPlayingSongId(id);
  loadNewSong();
};

window.addEventListener("load", () => {
  loadSongs();
});

elements.songsList.addEventListener("click", (e) => playSelectedSong(e));

//------Upload Files-------
elements.fileButton.addEventListener("change", (e) => {
  const file = e.target.files[0];
  state.upload = new Upload();
  state.upload.storeFile(file);
});

// toggle upload
elements.uploadToggle.addEventListener("click", () => {
  if (elements.uploadContainer.classList.contains("show")) {
    elements.uploadContainer.classList.remove("show");
    elements.uploadContainer.style.display = "none";
  } else {
    elements.uploadContainer.classList.add("show");
    elements.uploadContainer.style.display = "block";
  }
});
