import Invoice from "../models/invoice.js";

// Create an invoice
export async function createInvoice(req, res){
    try {
        let invoice = await Invoice.create(req.body);
        if (invoice){
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

