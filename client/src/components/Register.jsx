import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../services/user";

export default function Register(){
    const [form , setForm] = useState({username: '', email: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFromChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const data = await RegisterUser(form);
            localStorage.setItem('token', data.token);
            navigate('/dashboard', { state: { user: data.user } });
        } catch (error) {
            setError(error.response?.data?.error || 'Registration Failed')
        }
    }

    return(
        <div className="login-box">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input 
                name="username"
                type="text" 
                placeholder="username"
                value={form.username}
                onChange={handleFromChange}
                required
                />
                <input 
                name="email"
                type="email" 
                placeholder="email"
                value={form.email}
                onChange={handleFromChange}
                required
                />
                <input 
                name="password"
                type="password" 
                placeholder="password"
                value={form.password}
                onChange={handleFromChange}
                required
                />
                {error && <p className="error-text">{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}