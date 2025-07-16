const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../model/User');
const saltRounds= 10;

const connectDB = require('../config/db');
const { default: mongoose } = require('mongoose');
const secretKey = process.env.JWT_SECRET

router.post('/register', async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({error: "username and password are required."});
    }
    try {
        //check if user already exist.
        const existingUser = await User.findOne({username});
        if (existingUser){
            return res.status(409).json({error: "User already exists."});
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            createdAt: new Date()
        });
        const savedUser = await newUser.save();
        res.status(201).json({message: "User registered successfully", userId: savedUser._id});
    } catch (error) {
        console.error("Registration error", error);
        res.status(500).json({error: "Internal Server Error."});
    }
});

router.post('/login', authMiddleware, async(req, res) => {
    const {username, password} = req.body;

    if(!username||!password){
        return res.status(400).json({error: "username and password are required."});
    }

    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({error: "Invalid credentials."});
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(401).json({error: "Invalid credentials."});
        }
        
        //create JWT payload
        const payload = {userId: user._id, username: user.username};

        //Sign token
        const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});

        res.status(200).json({message: "Login Successful.", token});

    } catch (error) {
        console.error("JWT login error", error);
        res.status(500).json({error: "Internal Server Error."});
    }
});

router.get('/:id', authMiddleware,async(req, res) => {
    const {id} = req.params;

    //validate it is a proper id format in mongodb
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid user id format'})
    }
    try {
        const user = await User.findById(id).exec();
        if(!user){
            return res.status(404).json('user not found');
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user', error);
        res.status(500).json({error: 'Server Error'});
    }
});

router.put('/update-profile/:id', authMiddleware, async(req, res) => {
    const {id} = req.params;
    const updateData = req.body;

    //validate if proper format is followed
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid user id format'})
    }

    try {
        const updateUser = await User.findByIdAndUpdate(id, {$set: updateData}, {
            new: true,
            runValidators: true,
        }).exec();
        if(!updateUser){
            return res.status(404).json('User not found');
        }
        res.json(updateUser);
    } catch (error) {
        console.error('Error updating user', error);
        res.status(500).json({error: 'Serer Error.'});
    }
});

module.exports = router;