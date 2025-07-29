import { useEffect } from "react"
import { GetUser, UpdateProfile } from "../services/user"
import { useState, useRef } from "react"
import { GetProjectsByUser } from "../services/projects";
import ProjectForm from "../components/ProjectForm";
export function Dashboard(){

    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await GetUser();
                setUser(res.data);
                //console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const res = await GetProjectsByUser();
                setProjects(res.data);
            } catch (error) {
                console.error({message: error.message});
            }
        }
        fetchProjects();
    }, []);

    const handleClick = () => {
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({behavior: 'smooth'});
        }, 100);
    }

    //console.log(user);
    const handleFollowers = () => {
        console.log(<p>{user?.following}</p>)
    }
    
    return(
        <div className="dashboard">
            <div className="top-row">
                <h2>Welcome, {user?.username}</h2>
                <p>{user?.location}</p>
            </div>
            <div className="flex p-2 justify-between bg-[#fff]">
                <div className="skills">
                <p className="text-amber-600 text-3xl">My Skills</p>
                <ul className="">{user?.skills.map(skill => (
                    <li key={skill?._id}>
                        {skill?.name}
                    </li>
                ))}</ul>
                </div>
                <div className="endorsements">
                    <h2 className="text-3xl text-amber-600">Endorsements</h2>
                    <ul>{user?.endorsements.map(endorsement => (
                        <li key={endorsement?._id}> 
                            {endorsement?.skill} ({endorsement?.count})
                        </li>
                    ))}</ul>
                </div>
            </div>
            {/* <button onClick={handleFollowers} className="button">Followers</button> */}
            <h1 className="text-center text-3xl text-amber-600 m-6">Projects</h1>
            <div className="projects">
                {projects?.map(project => (
                    <div className="project" key={project._id}>
                        <h2>{project?.title}</h2>
                        <p>{project?.description}</p>
                    </div> 
                ))}
                <div>
                    <button className= 'btn' onClick={handleClick}>Add</button>
                    {showForm && (
                        <div ref={formRef} className="flex justify-center mt-2 text-center">
                            <ProjectForm />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export function UpdateUser({user}){
    const [editUser, setEditUser] = useState({...user});
    const [editing, setEditing] = useState(true);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await UpdateProfile();
                setEditUser(res.data);
            } catch (error) {
                console.error({message: 'Error updating user'});
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const res = await GetProjectsByUser();
                setProjects(res.data);
            } catch (error) {
                console.log({message: error.message});
            }
        }
        fetchProjects();
    }, [])

    const handleChange = (e) => {
        setEditUser({...editUser, [e.target.name]: e.target.value});
    }

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const res = await UpdateProfile(editUser);
            setEditUser(res.data);
            setEditing(false);
        } catch (error) {
            console.error(`Error updating ${editUser?.username}`, error.message);
        }
    }
 
    return(
        <div>
            {editing? (
                <form className="login-box">
                    {editUser && (
                        <div>
                            <p>Username:</p>
                            <input className="input" name="username" placeholder="username" value={editUser?.username || ''} onChange={handleChange} />
                            <p>Bio:</p>
                            <input className="input" name="bio" placeholder="bio" value={editUser?.bio || ''} onChange={handleChange} />
                            <p>Role:</p>
                            <input className="input" name="role" placeholder="role" value={editUser?.role || ''} onChange={handleChange} />
                            <p>Location:</p>
                            <input className="input" name="location" placeholder="location" value={editUser?.location || ''} onChange={handleChange} />
                            <p>Skills:</p>
                            {editUser?.skills?.map(skill => (
                                <div className="input" name="skill" placeholder="skill" key={skill?._id} >
                                    <input value={skill?.name || ''} onChange={handleChange}/>
                                </div>
                            ))}
                            <p>Endorsements:</p>
                            {editUser?.endorsements?.map(endorsement => (
                                <div className="input" name='endorsement' placeholder='endorsement' key={endorsement?._id}>
                                    <input value={endorsement?.skill || ''} onChange={handleChange} />
                                    <input value={endorsement?.count || ''} onChange={handleChange} />
                                </div>
                            ))}
                            <p>Projects:</p>
                            {projects?.map(project => (
                                <div key={project?._id}>
                                    <p>Title:</p>
                                    <input name="project" value={project?.title} onChange={handleChange} />
                                    <p>Description:</p>
                                    <input name="description" value={project?.description} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                    )}
                    <button className="btn" onClick={handleUpdate}>Save</button>
                </form>
            ):(
                <div>
                    <h2>User: {editUser?.username}</h2>
                    <ul>
                        <li>Username: {editUser?.username}</li>
                        <li>Password: {editUser?.password}</li>
                        <li>Skills: {editUser?.skills}</li>
                        <ul>{editUser?.endorsements.map(endorsement => (
                            <li key={endorsement?._id}> 
                                {endorsement?.skill} ({endorsement?.count})
                            </li>
                        ))}</ul>
                    </ul>
                </div>
            )}
            <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel': 'Edit'}</button>
        </div>
    )
}