import Invoice from "../models/invoice.js";
import Client from "../models/client.js";
import transport from "../middlewares/mailing.js";
import moment from "moment";
import cron from "node-cron";
import dotenv from "dotenv";
import got from "got";
import randomstring from "randomstring";

dotenv.config()


// Create an invoice
export async function createInvoice(req, res) {
    try {
        let invoice = await Invoice.create(req.body);
        if (invoice) {
            res.status(200).json({
                success: true,
                message: 'Invoice created successfully',
                data: invoice
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Invoice cannot be created at this time'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Invoice could not be created. check console for error log'
        })
    }
}

// Send an invoice and Payment Reminder
export async function sendInvoice(req, res) {
    try {
        let invoice = await Invoice.findOne({ where: { InvoiceId: req.params.id } });
        if (invoice) {
            res.status(200).json({
                success: true,
                message: "Invoice Found",
                data: invoice
            })

            // Send Invoice to Client
            let mailData = {
                from: '"Catherine" <catherinemuthoni865@gmail.com>', // sender address
                to: invoice.Email, // recepient
                subject: 'Your Invoice!',
                template: 'invoice', 
                context: {
                    name: invoice.Email, 
                    address: invoice.Address,
                    invoiceId: invoice.InvoiceId,
                    date: moment(),
                    due_date: invoice.DueDate,
                    task: invoice.Task,
                    amount: invoice.Amount
                    
                }
            };

            transport.sendMail(mailData, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });


            // Send reminder after due date passes and invoice is unpaid
            let dueDateMoment = moment(invoice.DueDate);
            let dueDateMomentArray = [dueDateMoment.format("m"), dueDateMoment.format("H"), dueDateMoment.format("D"), dueDateMoment.format("M")];

            cron.schedule(dueDateMomentArray[0] + ' ' + dueDateMomentArray[1] + ' ' + dueDateMomentArray[2] + ' ' + dueDateMomentArray[3] + ' *', async function () {
                await invoice.reload();

                if (invoice.Paid == false) {
                    let reminderMailData = {
                        from: '"Catherine" <catherinemuthoni865@gmail.com>', 
                        to: invoice.Email, 
                        subject: '*IMPORTANT* Payment Overdue: Kindly make your payment',
                        text: 'Kindly make your payment for the following invoice',
                        template: 'email', 
                        context: {
                            name: invoice.Email, 
                            city: invoice.Location, 
                            address: invoice.Address,
                            invoiceId: invoice.InvoiceId,
                            date: moment(),
                            due_date: invoice.DueDate,
                            task: invoice.Task,
                            amount: invoice.Amount,
                            price: invoice.Amount
                        }
                    };

                    transport.sendMail(reminderMailData, function (error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Reminder sent: ' + info.response);
                    });


                } else {
                    console.log("Payment was made on time. No reminders needed");

                }


            });


        } else {
            res.json({
                success: true,
                message: 'No User records found.',
            })

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })

    }
}

// Make payment
export async function makePayment(req, res) {
    try {
        // Get the invoice data
        let invoice = await Invoice.findOne({ where: { InvoiceId: req.params.id } });
        if (invoice) {

            // Handle Payment via Flutterwave
            try {
                const response = await got.post("https://api.flutterwave.com/v3/payments", {
                    headers: {
                        Authorization: `Bearer ${process.env.FLW_SECRET_API_KEY}`
                    },
                    json: {
                        tx_ref: randomstring.generate(),
                        payment_options: "card, credit, account",
                        amount: invoice.Amount,
                        currency: "USD",
                        redirect_url: "http://localhost:3000/paymentsuccess",
                        customer: {
                            email: invoice.Email,
                        },
                        customizations: {
                            title: "Catherine's Freelance Biz",
                            logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
                        }
                    }
                }).json();
                if (response) {
                    console.log(response);
                    res.status(301).redirect(response.data.link);
                    
                    // change the state of the invoice to paid
                    invoice.Paid = true;
                    await invoice.save();
                }
            } catch (err) {
                console.log(err);
                
            }

        } else {
            res.status(200).json({
                success: true,
                message: 'No invoice data'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Invoice could not be found. check console for error log'
        })
    }
}




