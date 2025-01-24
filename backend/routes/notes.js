const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../model/Notes');
const { body, validationResult } = require('express-validator');
//ROUTE1: Add a New Note using : POST "api/notes/fetchNotes". Login required
router.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

});
//ROUTE2: Add a New Note using :POST "api/notes/addNote".Login Required
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'the decription must be altleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE 3 : Update an existing Note using : PUT "api/notes/updateNote".Login Required
router.put('/updateNote:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
    const NewNote = {};
    if (title) {
        NewNote.title = title;
    }
    if (description) {
        NewNote.description = description;
    }
    if (tag) {
        NewNote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: NewNote }, { new: true });
    res.json({ note });
    } 
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
    
})
//ROUTE4: Delete an existing Note using : DELETE "api/notes/deleteNote".Login Required
router.delete('/deleteNote:id',fetchUser,async (req,res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ Success: 'Note has been deleted' });
    }
    catch (error){

    }
})
module.exports = router;