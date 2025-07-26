import { Link } from "react-router-dom";

function Footer(){
    return(
        <div className='flex text-center flex-col bg-white mt-3 p-3 gap-5'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>SignUp</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/update'>UpdateProfile</Link>
            <Link to='/profile'>Profile</Link>
        </div>
    )
}

export default Footer;