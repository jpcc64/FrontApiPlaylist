const db = require("../models");
const songjson = require("../config/PlaylistExport.json");
const Song = db.songs;

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Fill all rows" });
    return;
  }
  let dataSong = songjson.find(
    (song) => song.title == req.body.name && song.artist == req.body.artist
  );
  let featured = dataSong.artist.split(",");

  if (featured[1]) {
    featured = true;
  } else {
    featured = false;
  }

  const song = new Song({
    _id: new db.mongoose.Types.ObjectId(),
    name: dataSong.title,
    artist: dataSong.artist,
    featured: featured,
    playlist: req.body.playlist,
  });

  song
    .save(song)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Song.",
      });
    });
  console.log(req.body, dataSong.name);
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Song.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Song with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Song with id=" + id });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Song.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Song with id=${id}. Maybe Song was not found!`,
        });
      } else {
        res.send({
          message: "Song was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Song with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Song.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Song with id=${id}. Maybe Song was not found!`,
        });
      } else res.send({ message: "Song was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Song with id=" + id,
      });
    });
};