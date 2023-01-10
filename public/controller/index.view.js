const body = document.body;

const title = document.createElement("h1");
title.id = "title";
title.textContent = "Seleccione una opción";

///
/// CONSTRUCTOR DE INPUT PARA SONG
///

//formulario para el input de song
const form_songs = document.createElement("form");
form_songs.id = "form_songs";
//constructor del input de song
const songs = document.createElement("div");
songs.id = "songs";
const song = document.createElement("h3");
const create_song = document.createElement("input");
song.id = "song";
song.textContent = "Crea una cancion";
create_song.type = "text";
songs.append(song, create_song);

form_songs.action = "http://127.0.0.1:5500/api/songs/"+create_song.value;

//evento para recoger el valor del input
create_song.addEventListener("submit", function() {
fetch("http://127.0.0.1:5500/api/songs/" + create_song.value, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function(response) {
    console.log(response);
})
})
///
/// CONSTRUCTOR DE INPUT PARA PLAYLIST
///
const form_playlist = document.createElement("form");
form_playlist.id = "form_playlist";
form_playlist.action = "http://127.0.0.1:5500/api/playlist";

const playlists = document.createElement("div");
playlists.id = "playlists";
const playlist = document.createElement("h3");
const create_playlist = document.createElement("input");
playlist.id = "playlist";
playlist.textContent = "Crea una playlist";
create_playlist.type = "text";
playlists.append(playlist, create_playlist);

const div_input = document.createElement("div");

form_songs.appendChild(songs);
form_playlist.appendChild(playlists);

div_input.append(form_songs, form_playlist);

body.appendChild(title);
body.appendChild(div_input);
