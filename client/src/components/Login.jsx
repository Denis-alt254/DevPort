import { useState } from "react"
import { SignIn } from "../services/user"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const [form, setForm] = useState({username: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFromChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const data = await SignIn(form);
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.error || 'Login Failed')
        }
    }

    return(
        <div className="login-box">
            <h2>Login</h2>
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
                name="password"
                type="password" 
                placeholder="password"
                value={form.password}
                onChange={handleFromChange}
                required
                />
                {error && <p className="error-text">{error}</p>}
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}