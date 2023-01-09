const db = require("../models");
const Playlist = db.playlist;
const Song = db.songs;
const mongoose = require("mongoose");
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Fill all rows" });
    return;
  }

  if (!req.body.public) {
    req.body.public = true;
  } else {
    req.body.public = false;
  }

  const playlist = new Playlist({
    name: req.body.name,
    description: req.body.desc,
    public: req.body.public,
    songs: req.body.songs
  });

  playlist
    .save(playlist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Playlist.findOne(id)
    .populate("songs")
    .then((data) => {
      res.send(
       `Tl autor ${data.name} tiene ${data.songs.length} publicaciones`
      );
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        process.exit(-1);
      }
    });
};

exports.delete = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Playlist.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Playlist with id=${id}. Maybe Playlist was not found!`,
        });
      } else {
        const myPromise = new Promise((resolve, reject) => {
          for (let i = 0; i < data.songs.length; i++) {
            Song.findByIdAndRemove(mongoose.Types.ObjectId(data.songs[i].id));
          }
          resolve();
        });
        myPromise.then(
          res.send({
            message: "Playlist was deleted successfully!",
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Playlist with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Playlist.findByIdAndUpdate(id, req.body,{ useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update PLaylist with id=${id}. Maybe PLaylist was not found!`
        });
      } else res.send({ message: "PLaylist was updated successfully."});
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating PLaylist with id=" + id
      });
    });
};