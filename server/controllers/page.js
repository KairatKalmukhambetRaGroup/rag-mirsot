import Page from "../models/page/page.js";
import Block from '../models/page/block.js';
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from "url";

export const createPage = async (req, res) => {
    try {
        const newPage = await Page.create(req.body);
        return res.json(newPage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const createSubPage = async (req, res) => {
    const { name } = req.params;
    
    try {
        const page = await Page.findOne({name: name});
        if(!page)
            return res.status(404).json({error: "Page not found!"});

        const subpage = await Page.create(req.body);
        page.subpages.push(subpage._id);
        await Page.findByIdAndUpdate(page._id, {subpages: page.subpages});
        return res.json(subpage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const createBlock = async (req, res) => {
    const {type} = req.body;
    try {
        if(type === 'image'){
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            
            const newBlock = await Block.create({...req.body, src: req.file.filename});
            return res.json(newBlock);
        }
        else{
            const newBlock = await Block.create(req.body);
            return res.json(newBlock);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const getBlocks = async (req, res) => {
    try {
        const blocks = await Block.find();
        return res.json(blocks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}
export const updateBlock = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "Block not found!"});

    const updatedBlock = await Block.findByIdAndUpdate(id, req.body);

    return res.json(updatedBlock);
};
export const deleteBlock = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({error: "Block not found!"});
            
        await Block.findByIdAndRemove(id);
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const getPages = async (req, res) => {
    try {
        const pages = await Page.find({showOnHeader: true}).select('name title -blocks').populate({
            path: 'subpages',
            select: 'name title -blocks',
        });
        return res.json(pages);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}
export const updatePage = async (req, res) => {
    const { name } = req.params;

    try {
        const page = await Page.findOne({name: name});
        if(!page)
            return res.status(404).json({error: "Page not found!"});
    
        const updatedPage = await Page.findByIdAndUpdate(page._id, req.body);
    
        return res.json(updatedPage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."}); 
    }
}

export const getPageByName = async (req, res) => {
    try {
        const page = await Page.findOne({name: req.params.name});
        return res.json(page);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}