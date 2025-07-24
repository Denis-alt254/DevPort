import { useEffect } from "react";
import { useState } from "react";
import { GetUser } from "../services/user";
import { GetProjectsByUser } from "../services/projects";

function Profile(){

    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fetchUser  = async() => {
            try {
                const res = await GetUser();
                setUser(res.data);
            } catch (error) {
                console.error({message: error.message});
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

    return(
        <div className="ProfilePage">
            <div className="profilePic">
                <img>{user?.profilePicUrl}</img>
            </div>
            <div className="bg-amber-50">
                <div className="name">
                    <p>Username: {user?.username}</p>
                    <p>Role: {user?.role}</p>
                </div>
                <div>Location: {user?.location}</div>
            </div>
            <div className="bg-amber-50 mt-3">
                Bio: {user?.bio}
            </div>
            <h2 className="text-center text-3xl text-amber-600 m-3">Skills</h2>
            <div className="m-6 flex flex-col">
                {user?.skills.map(skill => (
                    <div className="" key={skill?._id}>
                        {skill?.name}
                    </div>
                ))}
            </div>
            <h2 className="text-center text-3xl text-amber-600">Projects</h2>
            <div className="flex justify-between text-center ">
                {projects?.map(project => (
                    <div className="flex flex-col items-center m-6" key={project?._id}>
                        <h2>{project?.title}</h2>
                        <div>
                            {/* <img>{project?.imageUrl}</img> */}
                            <p>{project?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="activity">
                <h2>Activity</h2>
                <p>Recent Activity will be shown here.</p>
            </div>
        </div>
    )
}

export default Profile;