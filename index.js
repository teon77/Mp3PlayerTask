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
  if(IndexById(player.songs,id)===undefined) throw "non-existent ID";
  player.songs.splice(IndexById(player.songs,id),1);  // removes 1 cell from the index
  for(let i=0;i<player.playlists.length;i++){   // iterate through different playlists
       let index2 = IndexById(player.playlists[i].songs,id) // finiding the index inside the array
       player.playlists[i].songs.splice(index2,1);
    }
  }

  function addSong(title, album, artist, duration, id) {
    if(ObjectById(player.songs,id)!==undefined) throw ("This ID is Taken");
      if(id===undefined) id = generateId(player.songs);
      convertToSeconds(duration)
      player.songs.push({ // push a new object to the array
        title: title,
        album: album,
        artist: artist,
        duration: convertToSeconds(duration),
        id: id
    });
  return id;
  }
  
  

function removePlaylist(id) {
  if(IndexById(player.playlists,id)==undefined) throw "non-existent ID";
    player.playlists.splice(IndexById(player.playlists,id),1);
}

function createPlaylist(name, id)  {
  if(IndexById(player.playlists,id)!=undefined) throw "This ID is Taken";
  if(id===undefined) id = generateId(player.playlists);
 
     player.playlists.push({
        name: name,
        id: id,
        songs: []
  })
  return id;
}

function playPlaylist(id) {
  ObjectById(player.playlists,id).songs.forEach(song => {
    playSong(song);
  });
}

function editPlaylist(playlistId, songId) {
    if(IndexById(player.songs,songId)===undefined) throw "non-existent ID";
    if(IndexById(player.playlists,playlistId)===undefined) throw "non-existent ID";
  let arr = ObjectById(player.playlists,playlistId).songs;
  if(arr.includes(songId,0)){            //checks if the song is in the playlist
      arr.splice(IndexById(arr,songId),1);     //removes the song
      if(arr.length===0){                   //checks if the playlist is empty
          removePlaylist(playlistId); //deletes the Playlist
      }
     }
      else{         //connected to the first if()
        arr.push(songId);
                       //adding the song to the end of the playlist
           
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


//gets an id of Item in an array and returning the whole object
function ObjectById(arr,id){  
  for(let i of arr){
    if(i.id==id) return i;
  }
      return undefined;
}


// find the index of an Item with given id,
// return the index at the array
// for songs array in player
function IndexById(arr,find) {
  for(let i = 0;i < arr.length; i++){
    if(arr[i].id==find){
     return i;
   }
  }
    return undefined;
}



//looking for highest id of song in the array, returning that value +1
//to prevent duplicates
function generateId(arr) {
  if(arr.length===0) return 1;
  let highestId = 0;
    for(let i=0;i<arr.length;i++){
      if(arr[i].id>highestId) highestId=arr[i].id;
    }
     return (highestId+1);
  }     

  // convert mm:ss to number 
  function convertToSeconds(time){
    let timeArr = time.split(":");
    let seconds = timeArr[0]*60 + timeArr[1]*1;   //uses timeArr[i] as number 
    return seconds;
  }
  