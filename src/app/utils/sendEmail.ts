import config from '../config';
import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.nodemailer_gmail,
      pass: config.nodemailer_gmail_pass,
    },
  });

  await transporter.sendMail({
    from: '"UMSHOP" <umshop@gmail.com>', // sender address
    to: to, // list of receivers
    subject: 'Password Reset Link', // Subject line
    text: 'This link is valid for only 10 minutes', // plain text body
    html: html, // html body
  });
};
