import { useEffect } from "react";
import { useState } from "react";
import { GetUser } from "../services/user";
import { useNavigate } from "react-router-dom";

function Explore(){

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await GetUser();
                setUser(res.data);
            } catch (error) {
                console.error({message: error.message});
            }
        }
        fetchUser();
    },[]);

    return(
        <div>
            <div className="flex justify-center p-2">
                <input type="text" placeholder="Search" className="bg-white rounded-2xl w-auto mt-2"/>
            </div>
            <div className="flex justify-between bg-white p-2">
                <span className="filters">skill</span>
                <span className="filters">location</span>
                <span className="filters">endorse</span>
                <span>more➡️</span>
            </div>
            <div className="flex">
                <div className="p-3 flex justify-center w-full max-w-40">
                    <img src="./Profile Image.jpg" alt="profile image" className="flex justify-center rounded-full w-30 h-30 p-3" />
                </div>
                <div className="grid grid-cols-2 p-2 bg-white m-2 w-full">
                    <span>{user?.username}</span>
                    <span>{user?.role}</span>
                    <span>{user?.location}</span>
                </div>
            </div>
            <div className="grid grid-cols-2 p-2 bg-white m-2">
                <span>Bio</span>
                <span>{user?.bio}</span>
            </div>
            <div>
                <span className="flex justify-center">Skills</span>
                <div className="flex justify-between p-3 bg-white">
                    {user?.skills?.map(skill => (
                        <div className="rounded-2xl bg-gray-400 p-4" key={skill?._id}>
                            {skill?.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center gap-20 p-3">
                <button className="w-20 p-2 bg-blue-600 rounded-2xl">Follow</button>
                <button className="w-20 p-2 bg-blue-600 rounded-2xl">Unfollow</button>
            </div>
            <a href="/profile" className="flex justify-center p-3">View full profile</a>
        </div>
    )
}

export default Explore;