import Page from "../models/page/page.js";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from "url";
import Text from '../models/page/text.js';
import Image from '../models/page/image.js';

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

        const subpage = await Page.create({...req.body, parent: page._id});
        page.subpages.push(subpage._id);
        await Page.findByIdAndUpdate(page._id, {subpages: page.subpages});
        return res.json(subpage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}


export const getPages = async (req, res) => {
    try {
        const pages = await Page.find({parent: null}).select('name title showOnHeader').populate({
            path: 'subpages',
            select: 'name title',
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
    const {name} = req.params;
    try {
        const page = await Page.findOne({name: name});
        const texts = await Text.find({parentId: page._id});
        const images = await Image.find({parentId: page._id});
        let arr = {};
        arr.title = page.title;
        texts.map((txt) => {
            arr[txt.name] = txt;
        })
        arr.images = images;

        if(name === 'home') {
            // directions
            arr.directions = [];
            const direction = await Page.findOne({name: 'directions'}).select('subpages').populate({
                path: 'subpages',
                select: 'title name'
            });
            for (let index = 0; index < direction.subpages.length; index++) {
                const sub = direction.subpages[index];
                const img = await Image.findOne({parentId: sub._id});
                arr.directions.push({_id: sub._id, name: sub.name, title: sub.title, image: img.src});
            }
            // services
            arr.services = [];
            const service = await Page.findOne({name: 'services'}).select('subpages').populate({
                path: 'subpages',
                select: 'title name'
            });
            for (let index = 0; index < service.subpages.length; index++) {
                const sub = service.subpages[index];
                const img = await Image.findOne({parentId: sub._id});
                arr.services.push({_id: sub._id, name: sub.name, title: sub.title, image: img.src});
            }
        }

        if(page.parent){
            arr.siblings = [];
            const parent = await Page.findById(page.parent).select('subpages').populate({
                path: 'subpages',
                select: 'title name',
                match: {
                    _id: {
                        $ne: page._id
                    }
                }
            });
            for (let index = 0; index < parent.subpages.length; index++) {
                const sub = parent.subpages[index];
                const img = await Image.findOne({parentId: sub._id});
                arr.siblings.push({_id: sub._id, name: sub.name, title: sub.title, image: img.src});
            }
        }

        return res.json(arr);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const createText = async (req, res) => {
    const { name } = req.body;
    try {
        const exist = await Text.findOne({name: name});
        if(exist)
            return res.status(409).json({error: `Content with name "${name}" already exist.`});

        const text = await Text.create(req.body);
        return res.json(text);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const getTextByNames = async (req, res) => {
    const {names} = req.query;
    try {
        const texts = await Text.find({name: {$in: names.split(',')}});
        let arr = {};
        texts.map((txt) => {
            arr[txt.name] = txt;
        })
        return res.json(arr);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const createImage = async (req, res) => {
    const { name, parentId } = req.body;
    try {
        const exist = await Image.findOne({name: name});
        if(exist)
            return res.status(409).json({error: `Content with name "${name}" already exist.`});

        const image = await Image.create({parentId, name, src: req.file.filename});
        return res.json(image);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}