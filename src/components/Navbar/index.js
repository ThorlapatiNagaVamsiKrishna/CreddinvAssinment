import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { FaRegUserCircle } from "react-icons/fa";
import Cookie from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom'
import './index.css'

const NavBar = () => {
    const [, setToken] = useState('')
    const userName = JSON.parse(localStorage.getItem('userData'))
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = Cookie.get('jwtToken')
        if (accessToken) {
            setToken(accessToken)
        }
    }, [])

    const handleLogout = () => {
        Cookie.remove('jwtToken')
        navigate('/login')
        setToken('')
    }

    return (
        <div className='nav-container'>
            <Link to='/'>
                <img src='https://www.creddinv.in/creddinv_social_logo.png' alt='logo' className='home-logo' />
            </Link>
            <div className='log-out'>
                <div className='user-profile'>
                    <FaRegUserCircle style={{ fontSize: '35px', color: '#085599' }} />
                    <Typography variant='h6' sx={{ color: '#085599', fontWeight: 'bold' }}>{userName}</Typography>
                </div>
                <button type='button' className='logout-button' onClick={handleLogout} >LOGOUT</button>
            </div>
        </div>
    )
}

export default NavBar