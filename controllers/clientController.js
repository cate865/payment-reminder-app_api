import Client from "../models/client.js";

// Add Client Details
export async function addClient(req, res){
    try {
        let client = await Client.create(req.body);
        if (client) {
            res.status(200).json({
                success: true,
                message: "Client added successfully",
                data: client
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Client could not be added at this time"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred. Check error log for details"
        })
    }
}