import express from "express";
import { createRecource, getResources } from "../controllers/recource.js";
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/',  getResources);
router.post('/', auth, createRecource);

export default router;