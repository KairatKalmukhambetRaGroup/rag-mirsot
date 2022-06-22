import express from "express";
import { createPage, getBlocks, getPageByName, getPages } from "../controllers/page.js";
import auth from '../middleware/auth.js';

const router = express.Router();


// router.get('/',  getResources);
router.post('/',  createPage);
router.get('/',  getPages);
router.get('/:name',  getPageByName);
router.get('/blocks', getBlocks);

export default router;