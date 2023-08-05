import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/action/user'

const Login = () => {

    /////////////////////////////////// VARIABLES /////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////// STATES /////////////////////////////////////
    const [userData, setUserData] = useState({  email: '', password: '' })

    /////////////////////////////////// USE EFFECTS ////////////////////////////////

    /////////////////////////////////// FUNCTIONS //////////////////////////////////
    const handleChange = (e) => {
        setUserData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) return alert('Make sure to provide all the fields')
        dispatch(login(userData))
    }

    return (
        <div>
            <div className='bg-gray-100 h-screen'>
                <div className='flex justify-center pt-16'>
                    <img className='w-41 h-11' src='/favicon/GrowLOGO.png' />
                </div>
                <div className='flex justify-center pt-10 pl-0 ml-0'>
                    <div className='w-96 h-auto bg-white shadow-xl rounded'>
                        <p className='text-xl text-slate-500 tracking-wide flex justify-center pt-10 font-Mulish'>Sign in to your account</p>
                        <form onSubmit={handleSubmit} className='w-auto pl-8 pt-4'>
                            <TextField value={userData.email} onChange={handleChange} label="Email" variant="standard" className='w-80' type='email' />
                            <br />
                            <br />
                            <TextField value={userData.email} onChange={handleChange} label="Password" variant="standard" className='w-80' type='password' />
                            <FormControlLabel control={<Checkbox />} className='text-slate-500 font-extralight pt-4' label="Remember Me" />
                            <Link to='#' className='text-slate-500 font-light flex justify-end pr-8 tracking-wide'>Forgot Password</Link>
                            <br />
                            <Button type='submit' className='w-80' variant='contained'>Login</Button>
                            <br />
                            <br />
                            <p className='font-Mulish font-thin text-slate-500 pl-10'>Don't have an account?
                                <Link to='/signup' className='text-blue-400'> Sign Up</Link>
                            </p>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login