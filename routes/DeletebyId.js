var express = require('express');
var router = express.Router();
var notes = require('../model/notes')


// delete by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;  
  console.log("delete run");
  try {
    const deletedNote = await notes.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({
      message: 'Note deleted successfully',
      note: deletedNote,
    });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid note ID' });
    }
    res.status(500).json({ error: 'Server error. Could not delete note.' });
  }
});


module.exports = router;