import userModel from '../model/user.model.js';
import *as userService from '../service/user.service.js';
import { validationResult } from 'express-validator';

export const createUserController = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {email,password} = req.body;
        const user = await userService.createUser({email,password});
        const token = user.generateAuthToken();
        delete user._doc.password; // Remove password from response
        res.status(201).json({
            user: user,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const loginUserController = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        delete user._doc.password; // Remove password from response
        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}