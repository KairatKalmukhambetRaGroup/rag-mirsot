import express from "express";
import { createBlock, createPage, createSubPage, deleteBlock, getBlocks, getPageByName, getPages, updateBlock, updatePage } from "../controllers/page.js";
import auth from '../middleware/auth.js';
import uploadMiddle from '../middleware/file.js';

const router = express.Router();


// router.get('/',  getResources);
router.post('/:name', createSubPage);
router.post('/',  createPage);
router.get('/',  getPages);
router.patch('/:name', updatePage);
router.post('/blocks', uploadMiddle.single('image'), createBlock);
router.get('/blocks', getBlocks);
router.patch('/blocks/:id', updateBlock);
router.delete('/blocks/:id', deleteBlock);
router.get('/:name',  getPageByName);

export default router;