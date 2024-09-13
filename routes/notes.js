var express = require('express');
var router = express.Router();
var notes = require('../model/notes')

/* view all data API. */
router.get('/viewall',async function(req, res, next) {
  console.log("/viewall run");
    try {
    var result = await notes.find()
    if(!result){
        return res.status(400).json({status:false,message:"Not get any data"})
    }
    res.status(201).json({
        message: 'Note get successfully',
        note: result,
      });
  } catch (error) {
    console.log(e);
    return e;
  }

});
// post data api
router.post('/create',async function(req, res, next) {
    console.log("create api run");
    const { title, content } = req.body;
    try {
        const newNote = new notes({
            title,
            content,
          });
        var result = await newNote.save()
        res.status(201).json({
            message: 'Note created successfully',
            note: result,
          });
    } catch (error) {
        console.log(error);
    }

  });
// get by id

// Retrieve a specific note by ID
router.get('/:id', async (req, res) => {
    console.log("get by id  route run");
    
    const { id } = req.params;  
    try {
      // Find the note by ID
      console.log(id);
      
      const note = await notes.findById(id);
  
      // If the note is not found, return a 404 error
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
  
      // If the note is found, return it in the response
      res.status(200).json(note);
    } catch (error) {
      console.error('Error retrieving note:', error.message);
  
      // Check if the error is due to invalid ObjectId
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'Invalid note ID' });
      }
  
      // Handle other potential errors
      res.status(500).json({ error: 'Server error. Could not retrieve note.' });
    }
  });
  

module.exports = router;
