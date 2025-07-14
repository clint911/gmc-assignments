const nodemailer = require('nodemailer');

// Update these with your email and app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com', // replace with your email
    pass: 'YOUR_APP_PASSWORD'      // replace with your app password
  }
});

const mailOptions = {
  from: 'YOUR_EMAIL@gmail.com', // replace with your email
  to: 'YOUR_EMAIL@gmail.com',   // replace with your email
  subject: 'Node.js Email Test',
  text: 'Hello from Node.js using Nodemailer!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
