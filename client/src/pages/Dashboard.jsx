import { useEffect } from "react"
import { GetUser } from "../services/user"
import { useState } from "react"

export default function Dashboard(){

    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await GetUser();
                setUser(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, []);
    
    return(
        <div>
            <h2>Welcome, {user?.username}</h2>
            <p>User Id, {user?._id}</p>
            <p>This is a Dashboard Page</p>
        </div>
    )
}