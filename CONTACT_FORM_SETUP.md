# Contact Form Setup Guide

## Issue: "Failed to send message"

### Possible Causes:
1. Gmail App Password is invalid or expired
2. Gmail security settings blocking the app
3. Server not running properly

### How to Fix:

#### Step 1: Generate a New Gmail App Password
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to Security
3. Enable 2-Step Verification (if not already enabled)
4. Go to "App passwords"
5. Generate a new app password for "Mail"
6. Copy the 16-character password (no spaces)
7. Replace the password in `server/index.js` line 30

#### Step 2: Update the Password
In `server/index.js`, update this line:
```javascript
pass: 'your-new-app-password-here'
```

#### Step 3: Test the Server
1. Make sure the server is running: `npm start`
2. Check the console for any errors
3. Try submitting the form again

#### Step 4: Alternative Solution (If Gmail doesn't work)
You can use a different email service or implement a simpler solution:
- Use a service like SendGrid, Mailgun, or EmailJS
- Or simply make the form open the user's email client

### Quick Test:
Open browser console and check for errors when submitting the form.
