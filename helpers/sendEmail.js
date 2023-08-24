import sgMail from '@sendgrid/mail';
import "dotenv/config";
import nodemailer from 'nodemailer';

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = data => {
  const email = {...data, from: 'n.olifirova@biko.com.ua'}
  console.log('email', email)
  return sgMail.send(email)
}

  export default sendEmail;