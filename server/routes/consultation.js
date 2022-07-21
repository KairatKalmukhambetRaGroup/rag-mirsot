import express from "express";
import { createConsultation, getConsultations } from "../controllers/consultation.js";
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/:status', auth, getConsultations);
router.post('/',  createConsultation);

export default router;