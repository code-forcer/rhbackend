// routes/newsletter.js
const express = require('express');
const Newsletter = require('../model/Newsletter');
const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse JSON
router.use(bodyParser.json());

// POST route for handling newsletter subscriptions
router.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;

  // Validate the email
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    // Check if the email is already in the database
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ error: 'This email is already subscribed.' });
    }

    // Save the email to the database
    const newSubscription = new Newsletter({ email });
    await newSubscription.save();

    res.status(200).json({ message: 'Successfully subscribed to the newsletter!' });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ error: 'Failed to subscribe to the newsletter.' });
  }
});

module.exports = router;
