import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const login = async (req, res) => {
    const {email, password, remember} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser)
            return res.status(404).json({error: "User does not exist."});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect)
            return res.status(401).json({error: "Invalid credentials."});
        let expireTime = "6h";
        if(remember)
            expireTime = "30d";
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, {expiresIn: expireTime});
        
        return res.status(200).json({user: existingUser, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role');
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}

export const addUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) 
        return res.status(409).json({error: "User already exist."});
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({...req.body, password: hashedPassword});
        await user.save();  

        const users = await User.find().populate('role');
        return res.status(200).json(users);      
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}