import express from "express";
import { createConsultation, createConsultationBranch, createConsultationSevice, getConsultationBranches, getConsultations, getConsultationServices } from "../controllers/consultation.js";
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/:status', auth, getConsultations);
router.post('/',  createConsultation);

router.get('/branch', getConsultationBranches);
router.post('/branch', auth, createConsultationBranch);

router.get('/service', getConsultationServices);
router.post('/service', auth, createConsultationSevice);

export default router;