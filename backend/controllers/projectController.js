const Project = require('../model/Project');

const getAllProjects = async(req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProjectsByUser = async(req, res) => {
    try {
        const userId = req.user.userId;
        const projects = await Project.find({userId: userId});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({error: 'Error fetching projects'})
    }
}

const creatProject = async(req, res) => {
    try {
        const {userId = req.user.userId, title, description, githubUrl, imageUrl, techStack} = req.body;
        if(!title){
            return res.status(400).json("Title should be provided.")
        }   
        
        //get user id for authenticated request
        //const userId = req.user.userId;

        const newProject = new Project({
            userId, title, description, githubUrl, imageUrl, techStack
        });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error("Error creating a project", error);
        res.status(500).json({message: error.message});
    }
}

const updateProject = async(req, res) => {
    try {
        const projectId = req.params.id;
        const userid = req.user._id;
        const {userId, title, description, githubUrl, imageUrl, techStack} = req.body;

        //find project
        const project = await Project.findById(projectId);

        if(!project){
            return res.status(404).json({error: 'Project not found.'});
        }

        //verify ownership
        if(project.userId !== userid){
            return res.status(403).json({error: 'You can only update your own projects.'});
        }

        //update fields if provided
        const fieldtoUpdate = ["userId", "title", "description", "githubUrl", "imageUrl", "techStack"]

        fieldtoUpdate.forEach(field => {
            if(req.body[field]){
                project[field] = req.body[field];
            }
        });

        const updatedProject = await project.save();
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({error: 'Failed to update project'})
    }
}

const deleteProject = async(req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.user._id;

        //find project 
        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({error: 'Project not found'});
        }

        //check ownership
        if(project.userId !== userId){
            return res.status(403).json({error: 'You can only delete your own projects.'});
        }
        await project.deleteOne();
        res.status(200).json({message: 'Project deleted successfully.'})
    } catch (error) {
        console.error("Error deleting the project: ", error);
        res.status(500).json({error: 'Failed to delete project.'})
    }

}

module.exports = {getAllProjects, getProjectsByUser, creatProject, updateProject, deleteProject};