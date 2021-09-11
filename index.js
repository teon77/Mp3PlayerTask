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
  try {
 return player.playSong(getById(player.songs,id));
  }
  catch {
    throw "non-existent Song ID"
  }
}

function removeSong(id) {
  if(getById(player.songs,id)===undefined) throw "non-existent ID";
  player.songs.splice(getById(player.songs,id),1);  // removes 1 cell from the index
  for(let i = 0; i < player.playlists.length; i++){   // iterate through different playlists
       let index = player.playlists[i].songs.indexOf(id) // finiding the index inside the array
       player.playlists[i].songs.splice(index,1);
    }
  }

  function addSong(title, album, artist, duration, id= generateId(player.songs)) {
    if(getById(player.songs,id)!==undefined) throw ("This ID is Taken");
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
  if(getById(player.playlists,id)===undefined) throw "non-existent Playlist ID";
    player.playlists.splice(getById(player.playlists,id),1);  //remove one cell from the index
}

function createPlaylist(name, id = generateId(player.playlists))  {
  if(getById(player.playlists,id)!==undefined) throw "This ID is Taken";
      player.playlists.push({
        name: name,
        id: id,
        songs: []
  })
  return id;
}

function playPlaylist(id) {
 try{ getById(player.playlists,id).songs.forEach(song => {
    playSong(song);
  });
}
catch {
  throw "non-existent Playlist ID";
}
}


function editPlaylist(playlistId, songId) {
    if(getById(player.songs,songId)===undefined) throw "non-existent Song ID";
    if(getById(player.playlists,playlistId)===undefined) throw "non-existent Playlist ID";
  let arr = getById(player.playlists,playlistId).songs;
  if(arr.includes(songId,0)){            //checks if the song is in the playlist
      arr.splice(arr.indexOf(songId),1);     //removes the song
      if(arr.length===0){                   //checks if the playlist is empty
          removePlaylist(playlistId); //deletes the Playlist
      }
     }
      else{            //connected to the first if()
        arr.push(songId);   //adding the song to the end of the playlist
     }
  }


  // gets a playlist id and returning its duration
function playlistDuration(id) {
  try{
  let total = 0;
  const arr = getById(player.playlists,id).songs;
  for(let i = 0; i < arr.length; i++){
    total += getById(player.songs,arr[i]).duration; //getting the song duration from the property songs in player
  }
  return total;
}
catch {
   throw "There isn`t such Playlist";
}
}

function searchByQuery(query) {
  try{
  query = query.toLowerCase();    // use query in lower case
  let result = { songs: [] , playlists: []}
    for(let cell of player.songs) {    
        for(let prop in cell) {       // for every property in every cell of the songs array
          if(`${cell[prop]}`.toLowerCase().includes(query,0))
             if(getById(result.songs,cell.id)===undefined)  // I dont want songs to appear more than once
                 result.songs.push(cell);
        }
    }
    for(let cell of player.playlists){     // for every cell of the playlists array
      if(cell.name.toLowerCase().includes(query,0)) 
         if(getById(result.playlists,cell.id)===undefined) //  I dont want playlists to appear more than once
             result.playlists.push(cell);
    }
      result.songs.sort((a,b) => { if(a.title < b.title) return -1});   //just sorting didnt wanna use an extra function
      result.playlists.sort((a,b) => { if(a.name < b.name) return -1});
      return result;
  }
  catch{
    throw "It seems like you dont have any Songs or Playlists";
  }
}

function searchByDuration(duration) {
  let converted = convertToSeconds(duration);
   try {
  let closestSong = player.songs[0],      // Initialize
       closestPlay = player.playlists[0],    // Initialize
         gapSong = Math.abs(player.songs[0].duration - converted);   // Initialize
    for(let i = 1; i < player.songs.length; i++){
        if(Math.abs(player.songs[i].duration - converted) < gapSong){  // if we found a smaller gap
            closestSong = player.songs[i];       // save the song object
            gapSong = Math.abs(player.songs[i].duration - converted);  // define a new gap
    }
  }
  let gapPlay = Math.abs(playlistDuration(player.playlists[0].id) - converted);    // Initialize
  for(let i = 1; i < player.playlists.length; i++){
      if(Math.abs(playlistDuration(player.playlists[i].id) - converted) < gapPlay){     // if we found a smaller gap
          closestPlay = player.playlists[i];                                   // save the playlist object
          gapPlay = Math.abs(playlistDuration(player.playlists[i].id) - converted);     // define new gap
  }
}
    if(gapPlay < gapSong)       // compare the gaps, return the smaller
      return closestPlay;
      return closestSong;
}
catch{
  throw "It seems like you dont have any Songs or Playlists";
} 
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


// function to display the duration in requested format
// turns number to mm:ss;
function showDuration(duration){ 
  try {
  let x = new Date(duration * 1000).toISOString().substr(14, 5);
  return x;
  }
  catch {
    throw "Please send this function a number"
  }
} 



// function gets an array and id, check if the array have a cell with that id.
// returns the object or the index based on how the function was called.
// using it also to know if an array consists of somethign where indexOf didnt work
// return undefined if wasnt
function getById(arr,id) {
try {
    for(let i of arr){
      if(i.id==id){
       return i;
    }
  }
    return undefined;
}
catch {
  throw "You should call this function with an array and an id of an item in that array";
}
}


// looking for highest id of song in the array, returning that value +1
// to prevent duplicates
// function will return 1 for empty or invalid array
function generateId(arr) {
  let highestId = 0;
    for(let i=0;i<arr.length;i++){
      if(arr[i].id>highestId) highestId=arr[i].id;
    }
     return (highestId+1);   
  }     

  // convert mm:ss to number 
  function convertToSeconds(time){
    try {
    let timeArr = time.split(":");
    let seconds = timeArr[0]*60 + timeArr[1]*1;   //uses timeArr[i] as number 
    return seconds;
    }
    catch {
      throw "Please use the mm:ss Form as a String";
    }
  }
  