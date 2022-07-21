import Consultation from "../models/consultation/request.js";

export const createConsultation = async (req, res) => {
    const {name, email, direction, service} = req.body;

    try {
        if(!name || !email || !direction || !service)
            return res.status(400).json({error: "Missing or invalid required parameter"});
        const consultation = new Consultation(req.body);
        await consultation.save();
        
        return res.status(201).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const getConsultations = async(req, res) => {
    const {status} = req.params;
    try {
        const consultations = await Consultation.find({status}).populate('direction').populate('service').sort('-createdAt');
        return res.json(consultations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}
