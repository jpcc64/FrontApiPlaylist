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
const pinta_song = (data) => {
  console.log(data);
  const name_songHTML = document.createElement("h2");
  name_songHTML.id = "name_songHTML";
  name_songHTML.textContent = data.name;
  const artist_songHTML = document.createElement("h2");
  artist_songHTML.id = "artist_songHTML";
  artist_songHTML.textContent = data.artist;

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

const playlist_search = async () => {
  await fetch(
    "http://localhost:8080/api/playlist/" + create_playlistHTML.value
  )
    .then((response) => {
      const json = response.json();
      return json;
    })
    .then((json) => {
      pinta_playlist(json);
    });
};
const pinta_playlist = (data) => {
  console.log(data);
  const playlist_songHTML = document.createElement("h2");
  playlist_songHTML.id = "name_songHTML";
  playlist_songHTML.textContent = data.name;
  const tamaño_playlistHTML = document.createElement("h2");
  tamaño_playlistHTML.id = "tamaño_playlistHTML";
  tamaño_playlistHTML.innerHTML ="Numero de canciones: "+ data.songs.length;
  playlistHTML.append(playlist_songHTML, tamaño_playlistHTML);
};

///
/// CONSTRUCTOR DE LA PAGINA
///

const div_input = document.createElement("div");

form_songsHTML.appendChild(songsHTML);
form_playlistHTML.appendChild(playlistHTML);

div_input.append(form_songsHTML, form_playlistHTML);
 // añade titulo y formularios
body.appendChild(titleHTML);
body.appendChild(div_input);

const despliegaPrograma = () => {
  create_songHTML.addEventListener("change", song_search);
  create_playlistHTML.addEventListener("change", playlist_search);
};

despliegaPrograma();
