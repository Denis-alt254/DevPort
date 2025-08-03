const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../model/User');
const saltRounds= 10;

const { default: mongoose } = require('mongoose');
const secretKey = process.env.JWT_SECRET

router.post('/register', async(req, res) => {
    const {username, password, email} = req.body;

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
            email,
        });
        const savedUser = await newUser.save();
        res.status(201).json({message: "User registered successfully", userId: savedUser._id});
        //create JWT payload
        const payload = {userId: savedUser._id, username: savedUser.username};

        //Sign token
        const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});

        res.status(200).json({message: "Login Successful.", token});
    } catch (error) {
        console.error("Registration error: ", {message: error.message});
        res.status(500).json({error: "Internal Server Error."});
    }
});

router.post('/login', async(req, res) => {
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

router.get('/me', authMiddleware,async(req, res) => {
    const userId = req.user.userId;
    //validate it is a proper id format in mongodb
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({error: 'Invalid user id format'})
    }
    try {
        const user = await User.findById(userId).exec();
        if(!user){
            return res.status(404).json('user not found');
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user', error);
        if(!res.headersSent){
            res.status(500).json({error: 'Server Error'});
        }
    }
});

router.put('/update-profile', authMiddleware, async(req, res) => {
    const id = req.user.userId;
    const updateData = req.body;
    console.log('Updated Data: ', updateData);

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
        if(!res.headersSent){
            res.status(500).json({error: 'Server Error'}, error.message);
        }
    }
});

router.post('/follow/:id', authMiddleware, async(req, res) => {
    const userId = req.body._id;
    const targetId = req.params.id;

    if(userId === targetId) return res.status(400).send("Can't follow yourself");

    await User.findByIdAndUpdate(userId, {$addToSet: {following: targetId}});
    await User.findByIdAndUpdate(targetId, {$addToSet: {followers: userId}});

    res.send('Followed successfully');
});

router.get('/:id/followers', async(req, res) => {
    const user = await User.findById(req.params.id).populate('followers', 'username');
    res.json(user.followers);
});

router.get('/:id/following', async(req, res) => {
    const user = await User.findById(req.params.id).populate('following', 'username');
    res.json(user.following);
});

router.post('/:id/endorse', async(req, res) => {
    const { id } = req.params;
    const { skill } = req.body;

    const user = await User.findById(id);

    const skillExist = user.endorsements.some(
        e => e.skill.toLowerCase() === skill.toLowerCase()
    );

    if(skillExist){
        skillExist.count += 1;
        return res.status(400).json({message: 'Skill Already Exist.'});
    }else{
            user.endorsements.push({ skill, count: 1});
    }

    await user.save();

    return res.status(200).json({message: `Endorsed ${skill} successfully.`});
});

module.exports = router;