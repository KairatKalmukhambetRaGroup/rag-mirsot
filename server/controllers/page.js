import Page from "../models/page/page.js";
import Block from '../models/page/block.js';

export const createPage = async (req, res) => {
    const page = req.body;
    try {
        // console.log(req.body);
        let newBlocks = [];
        if(page.blocks && page.blocks.length > 0){
            for (let index = 0; index < page.blocks.length; index++) {
                const subblock = page.blocks[index];
                await createBlock(subblock).then((val) => { newBlocks.push(val) });
            }
        }
        const newPage = await Page.create({...page, blocks: newBlocks});
        return res.json(newPage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

var createBlock = async function (block) {
    try {
        let newSubblocks = [];
        if(block.subblocks && block.subblocks.length > 0){
            for (let index = 0; index < block.subblocks.length; index++) {
                const subblock = block.subblocks[index];   
                await createBlock(subblock).then((val) => { newSubblocks.push(val)});
            }
        }
        const newBlock = await Block.create({...block, subblocks: newSubblocks});
        return String(newBlock._id);
    } catch (error) {
        throw error;
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

export const getPages = async (req, res) => {
    try {
        const pages = await Page.find().select('title_kz title_ru title_en -blocks');
        return res.json(pages);
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