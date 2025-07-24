const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
    }, 
    bio: String,
    profilePicUrl: String,
    role: String,
    location: String,
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String
    },
    skills: [{
        name: {type: String}
    }],
    endorsements: [{
        skill: {type: String, required: true},
        count: {type: Number}
    }],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);