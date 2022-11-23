const nodemailer = require('nodemailer');

const yourEmail = process.env.mail;
const yourPass = process.env.mail_password;
const mailHost = process.env.mail_smtp;
const mailPort = process.env.mail_port;
const senderEmail = process.env.mail;


/**
 * Send mail
 * @param {string} to 
 * @param {string} subject 
 * @param {string[html]} htmlContent 
 * @returns 
 */
const sendMail = (to, subject, htmlContent) => {
  let transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // use SSL - TLS
    auth: {
      user: yourEmail,
      pass: yourPass,
    },
  });
  let mailOptions = {
    from: senderEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions); // promise
};

module.exports = {
    sendMail
};