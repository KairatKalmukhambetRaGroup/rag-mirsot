import Consultation from "../models/consultation/request.js";
import ConsultationBranch from "../models/consultation/branch.js";
import ConsultationService from "../models/consultation/service.js";
import mongoose from "mongoose";

export const createConsultation = async (req, res) => {
    const {name, email, branch, service} = req.body;

    try {
        if((!name || !email) || (!branch || !mongoose.isValidObjectId(branch)) || (!service || !mongoose.isValidObjectId(service)))
            return res.status(400).json({error: "Missing or invalid required parameter"});
        const consultation = new Consultation({name, email, branch, service});
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
        const consultations = await Consultation.find({status}).populate('branch').populate('service').sort('-createdAt');
        return res.json(consultations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const getConsultationBranches = async(req, res) =>{
    try {
        const branches = await ConsultationBranch.find();
        return res.status(201).json(branches);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}
export const createConsultationBranch = async(req, res) => {
    const branch = new ConsultationBranch(req.body);
    try {
        await branch.save();
        const branches = await ConsultationBranch.find();
        return res.status(201).json(branches);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const getConsultationServices = async(req, res) =>{
    try {
        const services = await ConsultationService.find();
        return res.status(201).json(services);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}
export const createConsultationSevice = async(req, res) => {
    const service = new ConsultationService(req.body);
    try {
        await service.save();
        const services = await ConsultationService.find();
        return res.status(201).json(services);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}