const mongoose = require('mongoose');

// Create a schema for the notes
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    trim: true,
  },
  content: {
    type: String,
    required: true, 
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
