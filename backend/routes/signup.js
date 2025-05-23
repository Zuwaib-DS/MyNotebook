const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/signup
// @desc    Register new user
// @access  Public
router.post(
    '/',
    [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Valid email is required').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        console.log('Received request to register user:', req.body);
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() , body: req.body});
        }

        const { name, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Create new user
            user = new User({
                name,
                email,
                password: await bcrypt.hash(password, 10),
                date: new Date(),
            });

            await user.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;