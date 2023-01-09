module.exports = (app) => {
  const playlists = require("../controllers/playlist.controller.js");

  var router = require("express").Router();
  
  router.post("/",playlists.create)
  router.get("/:id", playlists.findOne)
  router.delete("/:id",playlists.delete)
  router.put("/:id",playlists.update)

  app.use("/api/playlist", router); //THE REAL RUTA !!!!!!!!!!1
};
