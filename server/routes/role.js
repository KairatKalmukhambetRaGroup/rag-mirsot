import express from "express";
import { createRole, getRoles } from "../controllers/role.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',  getRoles);
router.post('/',  createRole);

export default router;