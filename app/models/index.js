const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.songs = require("./songs.model.js")(mongoose);
db.playlist = require("./playlist.model.js")(mongoose);
module.exports = db;
