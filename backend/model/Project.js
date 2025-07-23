const { default: mongoose } = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    description: String,
    githubUrl: String,
    imageUrl: String,
    techStack: [{type: String}]
}, {timestamps: true});
    
module.exports = mongoose.model('Project', ProjectSchema);