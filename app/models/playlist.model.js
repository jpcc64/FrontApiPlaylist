module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      description: String,
      public: String,
      songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Playlist = mongoose.model("playlist", schema);
  return Playlist;
};
