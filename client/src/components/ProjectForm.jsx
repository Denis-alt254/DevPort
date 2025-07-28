import { useState } from "react";
import { AddProject } from "../services/projects";

function ProjectForm(){
    const [project, setNewProject] = useState({title: '', description: '', githubUrl: '', imageUrl: '', techStack: []});

    const handleFormChange = (e) => {
        setNewProject({...project, [e.target.name]: e.target.value});
    }

    const handleNewProject = async(e) => {
        e.preventDefault();
        try {
            const newProject = await AddProject(project);
            await newProject.save();
            setNewProject({title: '', description: '', githubUrl: '', imageUrl: '', techStack: []});
        } catch (error) {
            console.error({message: error.message});
        }
    }
    
    return(
        <div>
            <form onSubmit={handleNewProject}>
                <input 
                name="title"
                placeholder="title"
                value={project?.title}
                onChange={handleFormChange}
                />
                <input 
                name="description"
                placeholder="description"
                value={project?.description}
                onChange={handleFormChange}
                />
                <input 
                name="githubUrl"
                placeholder="githubUrl"
                value={project?.githubUrl}
                onChange={handleFormChange}
                />
                <input 
                name="imageUrl"
                placeholder="imageUrl"
                value={project?.imageUrl}
                onChange={handleFormChange}
                />
                <input 
                name="techStack"
                placeholder="techStack"
                value={project?.techStack}
                onChange={handleFormChange}
                />
                {error && <p className="error-text">{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ProjectForm;