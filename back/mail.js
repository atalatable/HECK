const nodemailer = require('nodemailer');

/**
 * Send mail
 * @param {string} to 
 * @param {string} subject 
 * @param {string[html]} htmlContent 
 * @returns 
 */
const sendMail = (to, subject, htmlContent) => {
  let transporter = nodemailer.createTransport({
    host: process.env.mail_smtp,
    port: process.env.mail_port,
    secure: false, // use SSL - TLS
    auth: {
      user: process.env.mail,
      pass: process.env.mail_password,
    },
  });
  let mailOptions = {
    from: process.env.mail,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions); // promise
};

module.exports = {
    sendMail
};