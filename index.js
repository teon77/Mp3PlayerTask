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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${showDuration(song.duration)}.`);
  }
}

function playSong(id) {
 return player.playSong(ObjectById(player.songs,id));
}


function removeSong(id) {
  if(IndexById(player.songs,id)==undefined) throw "non-existent ID";
  player.songs.splice(IndexById(player.songs,id),1); //removes 1 cell from the index
  for(let i=0;i<player.playlists.length;i++){  //iterate through different playlists
    let index2 =IndexInPlaylist(player.playlists[i].songs,id)
    player.playlists[i].songs.splice(index2,1);
    }
  }

  function addSong(title, album, artist, duration, id) {
    if(IndexById(player.songs,id)!=undefined) throw "This ID is Taken";
    player.songs.push(newSong = { //push a new object to the array
      title: title,
      album: album,
      artist: artist,
      duration: showDuration(duration),
      id: generateId(player.songs,id)
  });
  return id;
  }
  
  

function removePlaylist(id) {
  if(IndexById(player.playlists,id)==undefined) throw "non-existent ID";
    player.playlists.splice(IndexById(player.playlists,id),1);
}

function createPlaylist(name, id=generateId(player.playlists) ) {
  if(IndexById(player.playlists,id)!=undefined) throw "This ID is Taken";
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
  let arr =ObjectById(player.playlists,playlistId).songs;
  if(arr.includes(songId,0)){ //checks if the song is in the playlist
      arr.splice(IndexById(arr,songId),1);//removes the song
      if(arr.length==0){//checks if the playlist is empty
          removePlaylist(playlistId); //deletes the Playlist
      }
     } else{//connected to the first if()
     arr.push(songId);//adding the song to the end of the playlist
           throw "non-existent song ID"
     }
  }


function playlistDuration(id) {
  let total= 0;
  const arr= ObjectById(player.playlists,id).songs;
  for(let i= 0; i<arr.length; i++){
    total+=ObjectById(player.songs,arr[i]).duration;
  }
  return total;
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
  let x= new Date(duration * 1000).toISOString().substr(14, 5);
  return x;
} 


//getting id of Item in array and returning the whole object
function ObjectById(arr,id){  
  for(let i of arr){
    if(i.id==id) return i;
  }
      return undefined;
}


//find the index of an Item with given id,
// return the index at the array
function IndexById(arr,find) {
  for(let i = 0;i < arr.length; i++){
    if(arr[i].id==find){
     return i;
   }
  }
    return undefined;
}


//find the index of id at songs array in property playlists
function IndexInPlaylist(arr,find) {
  for(let i = 0;i < arr.length; i++){
    if(arr[i]==find){
      return i;
}
  }return undefined;
}

//looking for highest id of song in the array, returning that value +1
//to prevent duplicates
function generateId(arr,requestedId) {
  if(IndexById(arr,requestedId)==undefined) return requestedId;
  let highestId =0;
    for(let i=0;i<arr.length;i++){
      if(arr[i].id>highestId) highestId=arr[i].id;
    }
     return (highestId+1);
  }     
  
  
  //gets an id and returns the song duration
function getSongDuration(id){
return ObjectById(id).duration;
}
