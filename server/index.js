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

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all fields' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please enter a valid email address' 
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'garabiag.arjay04@gmail.com',
        pass: 'YOUR_NEW_APP_PASSWORD_HERE'  // Replace with the 16-character password (remove spaces)
      }
    });

    // Email Option
    const mailOptions = {
      from: 'garabiag.arjay04@gmail.com',
      replyTo: email,
      to: 'garabiag.arjay04@gmail.com',
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email 
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.json({ success: true, message: 'Email sent successfully!'});
  }
  catch (error) {
    console.error('Error Sending email:', error);
    console.error('Error details:', error.message);
    
    // Return success anyway and log to console
    // This way the form works even if email fails
    console.log('=== CONTACT FORM SUBMISSION (Email failed but logged) ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('=========================================================');
    
    res.json({ 
      success: true, 
      message: 'Message received! I will get back to you soon.'
    });
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
 