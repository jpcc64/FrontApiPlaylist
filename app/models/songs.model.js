
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      artist: String,
      featured: Boolean,
      playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "playlist" }],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Song = mongoose.model("song", schema);
  return Song;
};
