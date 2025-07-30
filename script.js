console.log("Welcome to Spotify");
// Initialize the variables
let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let autoplay = false;
let currentCover = document.getElementById('currentCover');
let autoplayToggle = document.getElementById('autoplayToggle');



let songs = [
    {songName:"One of the girls", filePath:"/songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName:"Favourite", filePath:"/songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName:"Swim", filePath:"/songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName:"Dont copy my flow", filePath:"/songs/5.mp3", coverPath: "covers/4.jpg"},
    {songName:"Ride or Die", filePath:"/songs/6.mp3", coverPath: "covers/5.jpg"},
    {songName:"Heat-Waves", filePath:"/songs/7.mp3", coverPath: "covers/6.jpg"},
    {songName:"Summer Time Sadness", filePath:"/songs/8.mp3", coverPath: "covers/7.jpg"},
    
]
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// Handle Play and Pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    const clickedIndex = parseInt(e.target.id);

    if (songIndex === clickedIndex && !audioElement.paused) {
      // Pause if same song is clicked again
      audioElement.pause();
      e.target.classList.remove('fa-pause-circle');
      e.target.classList.add('fa-play-circle');
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity = 0;
    } else {
      // Play the clicked song
      makeAllPlays();

      songIndex = clickedIndex;
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      currentCover.src = songs[songIndex].coverPath;
      currentCover.src = songs[songIndex].coverPath;

      audioElement.currentTime = 0;
      audioElement.play();

      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      gif.style.opacity = 1;
    }
  });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }

      audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
     gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
     gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
autoplayToggle.addEventListener('change', () => {
    autoplay = autoplayToggle.checked;
});
audioElement.addEventListener('ended', () => {
    if (autoplay) {
        songIndex = (songIndex + 1) % songs.length;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        currentCover.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

