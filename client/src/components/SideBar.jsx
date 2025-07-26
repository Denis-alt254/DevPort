import { Link } from "react-router-dom";

function SideBar(){
    return(
        <div className="sidebar">
            <div className="logo">
                <Link to='/dashboard'>Logo</Link>
            </div>
            <div className='side-links'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>SignUp</Link>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/update'>UpdateProfile</Link>
                <Link to='/profile'>Profile</Link>
            </div>
        </div>
    )
}

export default SideBar;