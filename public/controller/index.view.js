const body = document.body;

const title = document.createElement("h1");
title.id = "title";
title.textContent = "Seleccione una opción";

///
/// CONSTRUCTOR DE INPUT PARA SONG
///
const form_songs = document.createElement("form");
form_songs.id = "form_songs";

const songs = document.createElement("div");
songs.id = "songs";
const song = document.createElement("h3");
const create_song = document.createElement("input");
song.id = "song";
song.textContent = "Crea una cancion";
create_song.type = "text";
songs.append(song, create_song);
// form_songs.action = "http://127.0.0.1:5500/api/songs/"+song.nodeValue;
const link = "http:127.0.0.1:5500/api/songs/" + song.nodeValue;

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
playlists.appendChild(playlist, create_playlist);

const div_input = document.createElement("div");

form_songs.appendChild(songs);
form_playlist.appendChild(playlist);

div_input.append(form_songs, form_playlist);

body.appendChild(title);
body.appendChild(div_input);
