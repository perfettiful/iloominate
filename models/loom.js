const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loomSchema = new Schema({
  title: { type: String, required: true },
  loom: { type: String },
  date: { type: Date, default: Date.now },
  private: { type: Boolean }
});

const Loom = mongoose.model("Loom", loomSchema);

module.exports = Loom;