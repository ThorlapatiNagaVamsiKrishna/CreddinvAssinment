import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { TextField, Button, Box, Container, FormControlLabel, Checkbox, Typography } from '@mui/material'
import './index.css'

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', mobile: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
    const [showError, setShowError] = useState('')
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    const validateInputData = (name, value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobileRegex = /^\d{10}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let errorMsg;

        if (name === 'email') {
            if (!value) {
                errorMsg = 'Email is required'
            }
            else if (!emailRegex.test(value)) {
                errorMsg = 'Please provide valid email'
            }
        }
        if (name === 'mobile') {
            if (!value) {
                errorMsg = 'Mobile number is required'
            }
            else if (!mobileRegex.test(value)) {
                errorMsg = 'Mobile number must contain 10 digits'
            }
        }
        if (name === 'password') {
            if (!value) {
                errorMsg = 'Password is required'
            }
            else if (!passwordRegex.test(value)) {
                errorMsg = 'Passwords have a minimum of 8 chars and one special char, one number'
            }
        }
        return errorMsg
    }

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault()
        try {

            let validationErrors = {};
            Object.keys(loginData).forEach((field) => {
                const error = validateInputData(field, loginData[field]);
                if (error) validationErrors[field] = error

            });
            setErrorMessage(validationErrors)
            if (Object.keys(validationErrors).length === 0) {
                const payload = {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                }
                const dataFecth = await fetch('https://coding-assignment-server.vercel.app/login', payload)
                if (dataFecth.status === 200) {
                    const response = await dataFecth.json()
                    console.log(response)
                    Cookie.set('jwtToken', response.token, { expires: 1 })
                    localStorage.setItem('userData', JSON.stringify(response.userName))
                    setLoginData({ email: '', mobile: '', password: '' })
                    setShowPassword(false)
                    setErrorMessage('')
                    navigate('/')
                }
                else if (dataFecth.status === 400) {
                    const response = await dataFecth.json()
                    setShowError(response.message)
                }
            }
        } catch (e) {
            console.log(e.message, 'cath')
        }
    }


    const handleLoginData = (e) => {
        const { name, value } = e.target
        setLoginData((prevState) => ({
            ...prevState,
            [name]: value
        }))
        validateInputData(name, value)
        setErrorMessage((prevState) => ({
            ...prevState,
            [name]: validateInputData(name, value)
        }))
    }

    return (
        <Container maxWidth='sm'>
            <Box
                sx={{
                    mt: 8,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: "center",
                }}>
                <img src='https://www.creddinv.in/creddinv_social_logo.png' alt='logo' className='logo' />
                <form onSubmit={handleLoginFormSubmit}>
                    <TextField
                        required
                        label='Email ID'
                        type='email'
                        variant="outlined"
                        name='email'
                        fullWidth
                        margin='normal'
                        onChange={handleLoginData}
                        value={loginData.email}
                        helperText={errorMessage.email}
                        error={!!errorMessage.email}
                    />
                    <TextField
                        required
                        label='Mobile No'
                        type='number'
                        variant="outlined"
                        name='mobile'
                        fullWidth
                        margin='normal'
                        onChange={handleLoginData}
                        value={loginData.mobile}
                        helperText={errorMessage.mobile}
                        error={!!errorMessage.mobile}
                    />
                    <TextField
                        required
                        label='Password'
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        name='password'
                        fullWidth
                        margin='normal'
                        onChange={handleLoginData}
                        value={loginData.password}
                        helperText={errorMessage.password}
                        error={!!errorMessage.password}
                    />
                    <div className='checkbox-container'>
                        <FormControlLabel
                            control={<Checkbox checked={showPassword} onClick={handleShowPassword} />}
                            label="Remember Me"
                        />
                        <Button sx={{ color: 'black', textDecoration: 'underline' }}>Forget Password?</Button>
                    </div>
                    <Button type='submit' variant="contained" color="primary" fullWidth sx={{ mt: 1, mb: 1 }}>Login</Button>
                    {showError && <Typography variant='p' className='error-message'>{showError}</Typography>}
                </form>
            </Box>
        </Container>
    )
}

export default Login