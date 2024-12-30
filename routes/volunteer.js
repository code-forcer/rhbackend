const express = require("express");
const Volunteer = require("../model/Volunteer");
const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse JSON
router.use(bodyParser.json());

// POST route to handle form submissions and save data to the database
router.post('/api/volunteers/submit', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the data
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save the volunteer to the database
    const newVolunteer = new Volunteer({ name, email, message });
    await newVolunteer.save();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving volunteer:', error);
    res.status(500).json({ error: 'Failed to save volunteer data.' });
  }
});

// Route to Get All Volunteers (Admin)
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
