// Setting up email sending system.
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config()

var transport = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 25,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY
  }
});

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/',
        defaultLayout: 'invoice'
        // partialsDir : 'views/partials/'
    },
    viewPath: 'views/',
    extName: '.hbs'
};

// use a template file with nodemailer
transport.use('compile', hbs(handlebarOptions))


export default transport;