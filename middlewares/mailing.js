// Setting up email sending system.
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2cf8bfed437413",
    pass: "c0b934026ac9c0"
  }
});

// point to the template folder
const handlebarOptions = {
        viewEngine: {
            extname: '.hbs',
            layoutsDir: 'views/',
            defaultLayout : 'email'
            // partialsDir : 'views/partials/'
        },
        viewPath: 'views/',
        extName: '.hbs'
    };

// use a template file with nodemailer
transport.use('compile', hbs(handlebarOptions))


export default transport;