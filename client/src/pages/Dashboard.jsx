import { useEffect } from "react"
import { GetUser, UpdateProfile } from "../services/user"
import { useState } from "react"
import { GetProjectsByUser } from "../services/projects";

export function Dashboard(){

    const [user, setUser] = useState(null);

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

    //console.log(user);
    const handleFollowers = () => {
        console.log(<p>{user?.following}</p>)
    }
    
    return(
        <div className="login-box">
            <h2>Welcome, {user?.username}</h2>
            <h2 className="text-center text-amber-600 m-6 text-3xl">Skills</h2>
            <ul className="flex justify-between">{user?.skills.map(skill => (
                <li key={skill?._id}>
                    {skill?.name}
                </li>
            ))}</ul>
            <h2 className="text-center text-3xl text-amber-600 m-6">Endorsements</h2>
            <ul>{user?.endorsements.map(endorsement => (
                <li key={endorsement?._id}> 
                    {endorsement?.skill} ({endorsement?.count})
                </li>
            ))}</ul>
            {/* <button onClick={handleFollowers} className="button">Followers</button> */}
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
                console.log(res.data);
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

    const handleSkillChange = (e, index) => {
        const updateSkill = [...editUser.skills];
        updateSkill[index].name = e.target.value;
        setEditUser({ ...editUser, skills: updateSkill});
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
                            <input className="input" name="skill" placeholder="skill" value={editUser?.skills || ''} onChange={handleSkillChange} />
                            <p>Endorsements:</p>
                            <input className="input" name="endorsements" placeholder="endorsements" value={editUser?.endorsements || ''} onChange={handleChange} />
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
                        <li>Endorsements: {editUser?.endorsements}</li>
                    </ul>
                </div>
            )}
            <button className="btn" onClick={() => setEditing(!editing)}>{editing ? 'Cancel': 'Edit'}</button>
        </div>
    )
}