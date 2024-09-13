var express = require('express');
var router = express.Router();
var notes = require('../model/notes')


// delete by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;  // Get the note ID from the URL parameters
  console.log("delete run");
  try {
    // Find the note by ID and delete it
    const deletedNote = await notes.findByIdAndDelete(id);

    // If the note is not found, return a 404 error
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Return a success message when the note is deleted
    res.status(200).json({
      message: 'Note deleted successfully',
      note: deletedNote,
    });
  } catch (error) {
    console.error('Error deleting note:', error.message);

    // Check if the error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    // Handle other potential errors
    res.status(500).json({ error: 'Server error. Could not delete note.' });
  }
});


module.exports = router;