import express from "express";
import { addUser, getUsers, login } from "../controllers/user.js";
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', auth, getUsers);
router.post('/login', login);
router.post('/adduser', auth, addUser);

export default router;