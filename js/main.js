const poster = document.getElementById("poster");
const audio = document.getElementById("audio");
const title = document.getElementById('title');
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const play = document.getElementById("play");
const current_time = document.getElementById("current_time");
const current_audio = document.getElementById("current_audio");
const progressoInicial = document.getElementById("progressoInicial");
const progresoFinal = document.getElementById("progresoFinal");
const imagenplay = document.getElementById("imagen");

async function buscarTrackPorId(trackId) {
    const url = 'https://discoveryprovider.audius.co/v1/tracks/trending';

    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Datos de la API:', data);

        const track = data.data.find(track => track.blocknumber == trackId);
        if (track) {
        console.log('Track encontrado:', track.genre);
        return track;  // Retornamos el track encontrado
        } else {
        console.log('Track no encontrado');
        return null;  // Retornamos null si no se encuentra
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        return null;  // Retornamos null en caso de error
    }
    }

    const desiredTrackId = '68098235'; // Reemplaza con el ID del track que buscas
	buscarTrackPorId(desiredTrackId);

    

const songs = ["sonido1", "sonido2", "sonido3"];



let audioIndex = 0;

loadAudio(songs[audioIndex]);

function loadAudio(song) {
    title.textContent = song;
    audio.src = `music/${song}.mp3`;

    audio.addEventListener("loadedmetadata", ()=>{
        timeSong(audio.duration, current_audio)
    })
}
function playSong(){
    play.classList.add("play");

    const icon = imagenplay;

    icon.src = 'images/detener.png';
    audio.play()
}

function pauseSong(){
    play.classList.remove("play");

    const icon = imagenplay;

    icon.src = 'images/boton-de-play.png';
    audio.pause()
}

function updateBarProgress(e){
    const {duration, currentTime} = e.srcElement;

    const progressPorcent = (currentTime / duration) * 100;
    progresoFinal.style.width = `${progressPorcent}%`
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickPosition = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickPosition / width) * duration;
}

function timeSong(audio, element){
    const totalSeconds= Math.round(audio);
    const minutes= Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    element.textContent = `${minutes}:${seconds.toString().padStart(2,"0")}`;
}

function prevSong(){
    audioIndex--

    if(audioIndex < 0){
        audioIndex = songs.length - 1;
    }
    loadAudio(songs[audioIndex]);
    playSong();
}

function nextSong(){
    audioIndex++

    if(audioIndex > songs.length -1){
        audioIndex = 0;
    }
    loadAudio(songs[audioIndex]);
    playSong();
}

play.addEventListener("click", ()=>{
    const isPlaying = play.classList.contains("play");

    if (!isPlaying){
        playSong();
    }else{
        pauseSong();
    }
})

audio.addEventListener("timeupdate", (e) =>{
    updateBarProgress(e)
    timeSong(audio.currentTime, current_time);
});
progressoInicial.addEventListener("click", setProgress);
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
