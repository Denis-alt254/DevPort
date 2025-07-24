import { useEffect } from "react"
import { GetUser, UpdateProfile } from "../services/user"
import { useState } from "react"

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
            <li>Skills: {user?.skills}</li>
            <ul>Endorsements: {user?.endorsements.map(endorsement => (
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
                            <input className="input" name="username" placeholder="username" value={editUser?.username || ''} onChange={handleChange} />
                            <input className="input" name="skills" placeholder="skills" value={editUser?.skills || ''} onChange={handleChange} />
                            <input className="input" name="endorsements" placeholder="endorsements" value={editUser?.endorsements || ''} onChange={handleChange} />
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