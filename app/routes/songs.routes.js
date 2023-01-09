module.exports = (app) => {
  const songs = require("../controllers/songs.controller.js");

  var router = require("express").Router();

  router.post("/", songs.create);
  router.get("/:id", songs.findOne);
  router.delete("/:id", songs.delete);
  router.put("/cambiaPlaylist/:id", songs.update);
  
  app.use("/api/songs", router); //THE REAL RUTA !!!!!!!!!!1
};
