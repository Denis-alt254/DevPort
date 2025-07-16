const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String, 
    bio: String,
    profilePicUrl: String,
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String
    },
    skills: [String],
    endorsements: [{
        skill: String,
        count: Number
    }],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);