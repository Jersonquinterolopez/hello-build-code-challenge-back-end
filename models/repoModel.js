const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = Repo = mongoose.model('repo', repoSchema);
