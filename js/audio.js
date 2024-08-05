let audioFiles = [
  {
    name: "walking",
    path: "./audio/character_walking.mp3",
    loop: false,
    volume: 0.3,
    playbackrate: 4,
  },

  {
    name: "jumping",
    path: "./audio/character_jumping.mp3",
    loop: false,
    volume: 0.3,
    playbackrate: 1,
  },
  {
    name: "throwing",
    path: "./audio/bottle_throw.mp3",
    loop: false,
    volume: 0.3,
    playbackrate: 1,
  },

  {
    name: "bottlebreaking",
    path: "./audio/glass_shattering.mp3",
    loop: false,
    volume: 0.3,
    playbackrate: 1,
  },

  {
    name: "getItem",
    path: "./audio/bottle_took.mp3",
    loop: false,
    volume: 0.3,
    playbackrate: 1,
  },

  {
    name: "bossHurt",
    path: "./audio/chicken_boss.mp3",
    loop: false,
    volume: 0.3,
    playbackrate: 1,
  },

  {
    name: "bossDead",
    path: "./audio/chicken_boss_music.mp3",
    loop: false,
    volume: 0.5,
    playbackrate: 1,
  },
  {
    name: "winGame",
    path: "./audio/winning_short.mp3",
    loop: false,
    volume: 0.5,
    playbackrate: 1,
  },
  {
    name: "looseGame",
    path: "./audio/loosing_short.mp3",
    loop: false,
    volume: 0.5,
    playbackrate: 1,
  },
  {
    name: "chickenKill",
    path: "./audio/chicken_dying.mp3",
    loop: false,
    volume: 0.3,
    playbackrate: 2,
  },
  {
    name: "pepeHurt",
    path: "./audio/character_hurt.mp3",
    loop: false,
    volume: 0.3,
    playbackrate: 1,
  },
  {
    name: "menuLoop",
    path: "./audio/pollo_loco_OST.mp3",
    loop: true,
    volume: 0.3,
    playbackrate: 1,
  },
];
let muteIntro = false;
let isMuted = false;
let audioElements = {};

/**
 * Plays an audio file with the specified name, loading it if not already in cache.
 * @function
 * @param {string} name - The name of the audio file to be played.
 * @throws {Error} Throws an error if the audio file is not found or cannot be loaded.
 */
function playAudio(name) {

  if (!audioElements[name]) {
    let file = audioFiles.find((file) => file.name === name);
    if (file) {
      audioElements[name] = new Audio(file.path);
      audioElements[name].loop = file.loop;
      audioElements[name].volume = file.volume;
      audioElements[name].playbackRate = file.playbackrate;
    } else {
      console.error(`Data can not be found: ${name}`);
      return;
    }
  }
  if (!isMuted) {
    audioElements[name].play();
  }
}

/**
 * Mutes all audio elements by setting their volume to zero and updating mute buttons.
 */
function muteAudio() {
  isMuted = true;
  let mobileBtn = document.getElementById("muteBtnMobile");
  let Btn = document.getElementById("muteBtn");
  mobileBtn.classList.add("active");
  Btn.classList.add("active");
  Object.values(audioElements).forEach((audio) => {
    audio.volume = 0;
  });
}
/**
 * Unmutes all audio elements by setting their volume to maximum and updating unmute buttons.
 */
function unMuteAudio() {
  isMuted = false;
  let mobileBtn = document.getElementById("muteBtnMobile");
  let Btn = document.getElementById("muteBtn");
  mobileBtn.classList.remove("active");
  Btn.classList.remove("active");
  Object.values(audioElements).forEach((audio) => {
    audio.volume = 1;
  });
}
