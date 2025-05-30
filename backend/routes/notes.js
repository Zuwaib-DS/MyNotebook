const express = require('express');
const { body, validationResult } = require('express-validator');
const authenticateUser = require('../middleware/authenticateUser');
const Note = require('../models/Notes');

const router = express.Router();

// Route 1: Get all notes for logged in user: GET "/api/notes"
router.get('/', authenticateUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.userId, isActive: true })
            .sort({ isPinned: -1, pinnedAt: -1, updatedAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).send('Internal Server Error', error.message);
    }
});

// Route 2: Add a new note: POST "/api/notes"
router.post(
    '/',
    authenticateUser,
    [
        body('title', 'Title is required').notEmpty(),
        body('description', 'Description is required').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.userId,
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            res.status(500).send('Internal Server Error' + error.message);
        }
    }
);

// Route 3: Update an existing note: PUT "/api/notes/:id"
router.put(
    '/:id',
    authenticateUser,
    [
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        try {
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            if (note.user.toString() !== req.user.userId) {
                return res.status(401).json({ error: 'Not authorized' });
            }
            // Keep the Create date unchanged, update the updatedAt field
            newNote.date = note.date;
            newNote.updatedAt = Date.now();
            note = await Note.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );
            res.json(note);
        } catch (error) {
            res.status(500).send('Internal Server Error' + error.message);
        }
    }
);

// Route 4: Delete an existing note: DELETE "/api/notes/:id"
router.delete(
    '/:id',
    authenticateUser,
    async (req, res) => {
        try {
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            if (note.user.toString() !== req.user.userId) {
                return res.status(401).json({ error: 'Not authorized' });
            }

            // Soft delete: set isActive to false instead of deleting
            note.isActive = false;
            note = await note.save();
            //await Note.findByIdAndDelete(req.params.id);
            res.json({ message: 'Note deleted successfully', note });
        } catch (error) {
            res.status(500).send('Internal Server Error' + error.message);
        }
    }
);

// Route 5: Pin/ Unpin an existing note: PUT "/api/notes/pinunpin/:id/:pinStatus"
router.put(
    '/pinunpin/:id/:pinStatus',
    authenticateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        let newNote = {};
        
        try {
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            if (note.user.toString() !== req.user.userId) {
                return res.status(401).json({ error: 'Not authorized' });
            }
            // update only Pin status and PinnedAt date
            newNote = note;
            newNote.isPinned = req.params.pinStatus;
            newNote.pinnedAt = req.params.pinStatus === true ? Date.now() : null;
            note = await Note.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );
            res.json(note);
        } catch (error) {
            res.status(500).send('Internal Server Error' + error.message);
        }
    }
);

module.exports = router;