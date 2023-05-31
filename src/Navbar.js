import React from 'react'
import { Link } from 'react-router-dom'
import reactLogo from "./logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
    return (
        <nav >
        <img src={reactLogo} alt='logo'/>
            <nav className='inner'>
                <Link to='/about/About' className='anc'>Home</Link>
                <Link to='/login/LogIn' className='anc'>Log-In</Link>
                <Link to='/register/Register' className='anc'>Register</Link>
                <AccountCircleIcon fontSize='small' className='anc' >
                </AccountCircleIcon>

            </nav>
        </nav>
    )
}

export default Navbar
