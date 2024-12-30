// routes/contact.js
const express = require('express');
const Contact = require('../model/Contact');
const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse JSON
router.use(bodyParser.json());

// POST route for handling contact form submissions
router.post('/api/contact/submit', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate the data
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save the contact data to the database
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
