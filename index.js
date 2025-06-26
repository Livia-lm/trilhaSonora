/**
 * ===== CONSTANTES E VARIÁVEIS =====
 */
const STORAGE_KEY = "soundtrackPrefs";  // Chave do localStorage
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume-slider");

// Dados da trilha sonora (exemplo)
const soundtrackData = {
  1: {  // Temporada 1
    1: [  // Episódio 1
      { title: "Stranger Things", artist: "Kyle Dixon", src: "assets/audio/s1e1-track1.mp3" },
      { title: "Kids", artist: "Kyle Dixon", src: "assets/audio/s1e1-track2.mp3" }
    ],
    2: [  // Episódio 2
      { title: "Hawkins Lab", artist: "Kyle Dixon", src: "assets/audio/s1e2-track1.mp3" }
    ]
  }
};

let currentTrack = null;  // Armazena {season, episode, trackIndex}
let userPrefs = loadPreferences();  // Carrega preferências salvas

/**
 * ===== FUNÇÕES PRINCIPAIS =====
 */

// Carrega preferências do localStorage
function loadPreferences() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : { 
    volume: 0.7, 
    theme: "light", 
    favorites: [], 
    history: [] 
  };
}

// Salva preferências no localStorage
function savePreferences() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userPrefs));
}

// Reproduz uma faixa específica
function playTrack(season, episode, trackIndex) {
  const track = soundtrackData[season][episode][trackIndex];
  audioPlayer.src = track.src;
  audioPlayer.play();
  currentTrack = { season, episode, trackIndex };
  updateUI();
}

// Atualiza a interface (botões, tempo atual, etc.)
function updateUI() {
  playBtn.textContent = audioPlayer.paused ? "▶️ Play" : "⏸ Pause";
}

/**
 * ===== EVENT LISTENERS =====
 */
playBtn.addEventListener("click", () => {
  audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
  updateUI();
});

volumeSlider.addEventListener("input", (e) => {
  audioPlayer.volume = e.target.value;
  userPrefs.volume = e.target.value;
  savePreferences();
});

// Inicializa o player
audioPlayer.volume = userPrefs.volume;
volumeSlider.value = userPrefs.volume;