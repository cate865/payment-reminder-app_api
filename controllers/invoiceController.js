import Invoice from "../models/invoice.js";
import transport from "../middlewares/mailing.js";


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

// Send an invoice
export async function sendInvoice(req, res) {
    try {
        let invoice = await Invoice.findOne({ where: { InvoiceId: req.params.id } });
        if (invoice) {
            res.status(200).json({
                success: true,
                message: "Invoice Found",
                data: invoice
            })

            let mailData = {
                from: '"Adebola" <adebola.rb.js@gmail.com>', // sender address
                to: 'adebola.rb.js@gmail.com', // list of receivers
                subject: 'Your Invoice!',
                template: 'email', // the name of the template file i.e email.handlebars
                context: {
                    name: invoice.Email, // replace {{name}} with Adebola
                    city: invoice.Location, // replace {{company}} with My Companyce
                    address: invoice.Address,
                    invoiceId: invoice.InvoiceId,
                    date: Date.now(),
                    due_date: invoice.DueDate,
                    task: invoice.Task,
                    amount: invoice.Amount,
                    price: invoice.Amount
                }
            };


            // trigger the sending of the E-mail
            transport.sendMail(mailData, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
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
