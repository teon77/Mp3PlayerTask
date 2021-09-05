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
 return player.playSong(ObjectById(player.songs,id));
}


function removeSong(id) {
  player.songs.splice(IndexById(player.songs,id),1); //removes 1 cell from the index
  for(let i=0;i<player.playlists.length;i++){  //iterate through different playlists
    let index2 =IndexInPlaylist(player.playlists[i].songs,id)
    player.playlists[i].songs.splice(index2,1);
    }
  }

  function addSong(title, album, artist, duration, id=generateId(player.songs)) {
    player.songs.push(newSong = { //push a new object to the array
      title: title,
      album: album,
      artist: artist,
      duration: showDuration(duration),
      id: id
  });
  return id;
  }
  
  

function removePlaylist(id) {
    player.playlists.splice(IndexById(player.playlists,id),1);
}

function createPlaylist(name, id=generateId(player.playlists) ) {
  player.playlists.push(newPlaylist = {
      name: name,
      id: id,
      songs: []
  })
}

function playPlaylist(id) {
  ObjectById(player.playlists,id).songs.forEach(song => {
    playSong(song);
  });
}

function editPlaylist(playlistId, songId) {
  if(ObjectById(player.playlists,playlistId).songs.includes(songId,0)){ //checks if the song is in the playlist
      ObjectById(player.playlists,playlistId).songs.splice(IndexById(songId),1);//removes the song
      if(ObjectById(player.playlists,playlistId).songs.length==0)//checks if the playlist is empty
          removePlaylist(playlistId); //deletes the array
      
  } else{ //connected to first if()
         ObjectById(player.playlists,playlistId).songs.push(songId); //adding it to the end of the playlist
  }
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


//getting id of Item in array and returning the whole object
function ObjectById(arr,id){  
  for(let i of arr){
    if(i.id==id) return i;
  }
      console.log("There is no Item with that Id");
}


//find the index of an Item with given id,
// return the index at the array
function IndexById(arr,find){
  for(let i=0;i< arr.length;i++){
    if(arr[i].id==find){
     return i;
   }
  }
}


//find the index of id at songs array in property playlists
function IndexInPlaylist(arr,find){
  for(let i=0;i< arr.length;i++){
    if(arr[i]==find){
      return i;
}
  }
}

//looking for highest id of song in the array, returning that value +1
//to prevent duplicates
function generateId(arr){
  let highestId =0;
    for(let i=0;i<arr.length;i++){
      if(arr.id>highestId) highestId=arr.id;
    }
     return (highestId+1);
  }                                     

