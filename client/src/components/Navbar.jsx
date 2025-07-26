import { Link } from 'react-router-dom'

export default function NavBar(){
    return(
        <div className='header'>
            <div className="logo">
                <Link to='/dashboard'>Logo</Link>
            </div>
            <div className='nav-links'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>SignUp</Link>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/update'>UpdateProfile</Link>
                <Link to='/profile'>Profile</Link>
            </div>
        </div>
    )
}