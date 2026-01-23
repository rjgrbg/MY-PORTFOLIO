const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API Routes MUST come BEFORE static files
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Test route to verify POST is working
app.post('/api/test', (req, res) => {
  console.log('TEST ROUTE HIT!');
  res.json({ test: 'success', body: req.body });
});

// Contact Form 
app.post('/api/contact', async (req, res) => {
  console.log('=== Contact form received ===');
  console.log('Request body:', req.body);
  
  const {name, email, message} = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'garabiag.arjay04@gmail.com',
      pass: 'rfso kooq gqxz nzto'
    }
  });

  // Email Option
  const mailOptions = {
    from: email,
    to: 'garabiag.arjay04@gmail.com',
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n Message:\n${message}`
  };

  // Send email 
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!'});
  }
  catch (error) {
    console.error('Error Sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email'});
  }
});

// Static files AFTER API routes
app.use(express.static(path.join(__dirname, '../client')));

// Serve client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 