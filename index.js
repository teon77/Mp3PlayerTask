const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${showDuration(song.duration)}`);
  }
}

function playSong(id) {
 return player.playSong(SongObjectById(id));
}



function removeSong(id) {
  let index =SongIndexById(player.songs,id)
  player.songs.splice(index,1); //removes 1 cell from the index
  for(let i=0;i<player.playlists.length;i++){  //iterate through different playlists
    let index2 =IndexInPlaylist(player.playlists[i].songs,id)
    player.playlists[0].songs.splice(index2,1);
    }
  }

  function addSong(title, album, artist, duration, id=generateIdForSong(player.songs)) {
    let newSong = {
      title: title,
      album: album,
      artist: artist,
      duration: showDuration(duration),
      id: id
  };
  player.songs.push(newSong);
  return id;
  }
  
  

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}


//function to display the duration in requested format
function showDuration(duration){   
  let date = new Date(0);
date.setSeconds(duration); 
let timeString = date.toISOString().substr(11, 8);
return timeString;
} 


//getting id of song and returning the whole song object
function SongObjectById(id){  
  const arr =player.songs;
  for(let i of arr){
    if(i.id==id) return i;
  }
      console.log("There is no song with that Id");
}


//find the index of the song with given id, return the index
function SongIndexById(arr,find){
for(let i=0;i< arr.length;i++){
  if(arr[i].id==find){
    return i;
  }
}
}


//find the index of id inside the song array in playlists
function IndexInPlaylist(arr,find){
  for(let i=0;i< arr.length;i++){
    if(arr[i]==find){
      return i;
}
  }
}
//looking for highest id of song in the array, returning that value +1
//to prevent duplicates
function generateIdForSong(arr){
  let highestId =0;
  for(let i=0;i<arr.length;i++){
      if(arr.id>highestId) highestId=arr.id;
  }
  return (highestId+1);
  }                                     

