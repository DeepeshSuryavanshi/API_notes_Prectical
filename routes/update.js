var express = require('express');
var router = express.Router();
var notes = require('../model/notes')

router.put('/:id', async (req, res) => {
    console.log("update run");
    const { id } = req.params;  
    const { title, content } = req.body; 
  
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
    
      const updatedNote = await notes.findByIdAndUpdate(
        id,
        { title, content }
      );
  
      
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
  
     
      res.status(200).json({
        message: 'Note updated successfully',
        note: updatedNote,
      });
    } catch (error) {
      console.error('Error updating note:', error.message);
  
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'Invalid note ID' });
      }
  
      
      res.status(500).json({ error: 'Server error. Could not update note.' });
    }
  });
  module.exports = router;
