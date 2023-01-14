const body = document.body;
// 639b196711d7f93886e7efa0 cancion de prueba
const titleHTML = document.createElement("h1");
titleHTML.id = "title";
titleHTML.textContent = "Seleccione una opción";

///
/// CONSTRUCTOR DE INPUT PARA SONG
///

//    formulario para el input de song
const form_songsHTML = document.createElement("form");
form_songsHTML.id = "form_songsHTML";
form_songsHTML.method = "GET";
//    constructor del input de song
const songsHTML = document.createElement("div");
songsHTML.id = "songsHTML";
const song = document.createElement("h3");
const create_songHTML = document.createElement("input");
song.id = "song";
song.textContent = "Busca una cancion";
create_songHTML.type = "text";
songsHTML.append(song, create_songHTML);

//consulta a la api

const song_search = async () => {
  await fetch(
    "http://localhost:8080/api/songs/" + create_songHTML.value
    //   create_songHTML.value
  )
    .then((response) => {
      const json = response.json();
      return json;
    })
    .then((json) => {
      pinta_song(json);
    });
};
//pinta la consulta
const pinta_song = (data) => {
  console.log(data);
  const name_songHTML = document.createElement("h2");
  name_songHTML.id = "name_songHTML";
  name_songHTML.textContent = data.name;
  const artist_songHTML = document.createElement("h2");
  artist_songHTML.id = "artist_songHTML";
  artist_songHTML.innerHTML = `<h2 style="background-color: cornflowerblue;color:aliceblue;">${data.artist}</h2>`;
  song.innerHTML = `<h3 style ="color:red">Cancion encontrada</h3>`;
  create_songHTML.remove();
  songsHTML.append(name_songHTML, artist_songHTML);
};
///
/// CONSTRUCTOR DE INPUT PARA PLAYLIST
///
const form_playlistHTML = document.createElement("form");
form_playlistHTML.id = "form_playlistHTML";
form_playlistHTML.action = "http: 127.0.0.1:5500/api/playlist";

const playlistHTML = document.createElement("div");
playlistHTML.id = "playlistHTML";
const playlist = document.createElement("h3");
const create_playlistHTML = document.createElement("input");
playlist.id = "playlist";
playlist.textContent = "Busca una playlist";
create_playlistHTML.type = "text";
playlistHTML.append(playlist, create_playlistHTML);

//consulta a la api

const playlist_search = async () => {
  await fetch("http://localhost:8080/api/playlist/" + create_playlistHTML.value)
    .then((response) => {
      const json = response.json();
      return json;
    })
    .then((json) => {
      pinta_playlist(json);
    });
};

//pinta la consulta

const pinta_playlist = (data) => {
  console.log(data);
  const playlist_songHTML = document.createElement("h2");
  playlist_songHTML.id = "name_songHTML";
  playlist_songHTML.innerHTML = "La playlist se llama: " + data.name;
  const tamaño_playlistHTML = document.createElement("h2");
  tamaño_playlistHTML.id = "tamaño_playlistHTML";
  tamaño_playlistHTML.innerHTML = "Numero de canciones: " + data.songs.length;

  const pFrag = document.createDocumentFragment();
  for (let i = 0; i < data.songs.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = data.songs[i].name;
    pFrag.appendChild(li);
  }
  playlistHTML.append(playlist_songHTML, tamaño_playlistHTML, pFrag);
};
///
/// CONSTRUCTOR DE FORMULARIO POST
///
const form_postHTML = document.createElement("form");
form_postHTML.id = "form_postHTML";
form_postHTML.method = "POST";
const postHTML = document.createElement("div");
postHTML.id = "postHTML";
const post = document.createElement("h3");
const createArtistHTML = document.createElement("input");
createArtistHTML.id = "inputArtist"
let parentNode = document.getElementById("inputArtist");
const createNameSongHTML = document.createElement("input");
const creatPlaylisForSongtHTML = document.createElement("input");
const nombreCancionHTML = document.createElement("h3");
const artsitaCancionHTML = document.createElement("h3");
const playlistCancionHTML = document.createElement("h3");
post.id = "post";
post.textContent = "Crea una nueva cancion";
createArtistHTML.type = "text";
createNameSongHTML.type = "text";
nombreCancionHTML.textContent = "Nombre"
artsitaCancionHTML.textContent = "Artista";
playlistCancionHTML.textContent = "Playlist";
// parentNode.insertBefore(nombreCancionHTML, createNameSongHTML);
// parentNode.insertBefore(artsitaCancionHTML, createArtistHTML);
// parentNode.insertBefore(playlistCancionHTML, creatPlaylisForSongtHTML);
postHTML.append(
  post,
  nombreCancionHTML,
  createNameSongHTML,
  artsitaCancionHTML,
  createArtistHTML,
  playlistCancionHTML,
  creatPlaylisForSongtHTML
);

const pinta_post = (data) => {
  const idSong = document.createElement("h2");
  idSong.id = "idSong";
  idSong.innerHTML = "ID de la cancion: " + data.id;
  postHTML.append(idSong);
};

const creaCancion = async () => {
  let data = {
    name: createNameSongHTML.value,
    artist: createArtistHTML.value,
    playlist: creatPlaylisForSongtHTML.value,
  };
  await fetch("http://localhost:8080/api/songs/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      pinta_post(json);
    });
};
///
/// CONSTRUCTOR DE LA PAGINA
///

const div_input = document.createElement("div");

form_songsHTML.appendChild(songsHTML);
form_playlistHTML.appendChild(playlistHTML);

const despliegaPrograma = () => {
  div_input.append(form_songsHTML, form_playlistHTML);
  // añade titulo y formularios
  body.appendChild(titleHTML);
  body.appendChild(div_input);
  body.appendChild(postHTML);
  create_songHTML.addEventListener("change", song_search);
  create_playlistHTML.addEventListener("change", playlist_search);
  creatPlaylisForSongtHTML.addEventListener("change", creaCancion);
};

despliegaPrograma();
