const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Use environment variables

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend-backend communication

// Test route to check server status
app.get('/', (req, res) => {
  res.send('Welcome to the Quotation API');
});

// Nodemailer configuration using environment variables for security
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Fetch email from environment variable
    pass: process.env.EMAIL_PASS, // Fetch email password from environment variable
  },
});

// API endpoint to send email (for quotation request)
app.post('/request-email', (req, res) => {
  const { email, description } = req.body;

  if (!email || !description) {
    return res.status(400).send('Email and description are required.');
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Send email to the configured recipient
    subject: 'Quotation Request',
    text: `Quotation request from: ${email}\n\n${description}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      return res.status(500).send('Error sending email: ' + error.toString());
    }
    res.status(200).send('Quotation request sent successfully: ' + info.response);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
