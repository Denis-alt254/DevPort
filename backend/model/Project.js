const { default: mongoose } = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    githubUrl: String,
    imageUrl: String,
    techStack: [{String}]
}, {timestamps: true});

module.exports = mongoose.model('Project', ProjectSchema);