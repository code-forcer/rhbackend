const express = require('express');
const multer = require('multer');
const Donation = require('../model/Donation');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure the 'uploads' folder exists (create it if not)
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Save files in 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);  // Unique filename using timestamp
  },
});

const upload = multer({ storage });

// Endpoint to submit donation with file upload
router.post('/api/donate/submit', upload.single('proof'), async (req, res) => {
  const { name, email, amount } = req.body;
  const proof = req.file ? req.file.path : null;  // Store the file path in the database

  // Validate the input data
  if (!name || !email || !amount || !proof) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Create a new donation entry in the database
  try {
    const donation = new Donation({ name, email, amount, proof });
    await donation.save();  // Save the donation to the database

    // Respond with success message
    res.status(201).json({ message: 'Donation submitted successfully!' });
  } catch (error) {
    // Handle database errors
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to save donation. Please try again later.' });
  }
});

module.exports = router;
