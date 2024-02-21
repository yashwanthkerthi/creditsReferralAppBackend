const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kerthiyashwanthrao@gmail.com',
    pass: '@yashwanth2000'
  }
});

const mailOptions = {
  from: 'admin@gmail.com',
  to: 'kerthiyashwanthrao@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});