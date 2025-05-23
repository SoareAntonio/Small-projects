const player=document.querySelector('.player');
const video= player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipButtons=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');


const previewThumb = document.querySelector('.preview-thumb');
const thumbnailImg = document.querySelector('.thumbnail-preview');

function togglePlay(){
  if(video.paused){
    video.play();
  } else {
    video.pause();
  }
}
function updateButton() {
  const isPaused = video.paused;
  toggle.querySelector('.icon').textContent = isPaused ? '►' : '❚❚';
  toggle.querySelector('.tooltip').textContent = isPaused ? 'Play' : 'Pause';
}

function skip(){
  video.currentTime+= parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name]=this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration)*100;
  progressBar.style.flexBasis=`${percent}%`;
}

function scrub(e){
  const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
  video.currentTime=scrubTime;
}

function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (player.requestFullscreen) {
      player.requestFullscreen();// Chrome, Firefox, Edge
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen(); // Safari
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Safari
    }
  }
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
fullscreenButton.addEventListener('click', toggleFullscreen);

toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//previzualizare video
progress.addEventListener('mousemove', (e) => {
  const rect = progress.getBoundingClientRect();//Obține coordonatele exacte și dimensiunea elementului .progress pe ecran.
  const x = e.clientX - rect.left;// Calculează poziția X relativă în cadrul barei (unde ai mouse-ul).
  const percent = x / rect.width;
  const time = percent * video.duration;//Află momentul din video corespunzător poziției mouse-ului

  const interval = 10; // Dacă ai generat thumbnails la fiecare 10 secunde
  const index = Math.floor(time / interval) + 1;

  thumbnailImg.src = `thumbs/thumb-${index}.jpg`;

  // Afișează și poziționează thumbnail-ul
  previewThumb.style.display = 'block';
  previewThumb.style.left = `${x}px`;
});
//Când ieși cu mouse-ul de pe bară, ascunde previzualizarea
progress.addEventListener('mouseleave', () => {
  previewThumb.style.display = 'none';
});