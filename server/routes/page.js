import express from "express";
import { createImage, createPage, createSubPage, createText, getPageByName, getPages, updatePage } from "../controllers/page.js";
import auth from '../middleware/auth.js';
import uploadMiddle from '../middleware/file.js';

const router = express.Router();


// router.get('/',  getResources);
router.post('/',  createPage);
router.get('/',  getPages);
router.post('/text', createText);
router.post('/image',uploadMiddle.single('image'), createImage);
router.post('/:name', createSubPage);
router.patch('/:name', updatePage);
router.get('/:name',  getPageByName);
export default router;