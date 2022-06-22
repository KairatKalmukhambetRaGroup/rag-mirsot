import express from "express";
import { addVisitor, getVisitors } from "../controllers/visitor.js";
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getVisitors);
router.post('/', addVisitor);

export default router;