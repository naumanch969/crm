import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createRequestApproval } from '../../redux/action/approval'

const Signup = () => {

    /////////////////////////////////// VARIABLES /////////////////////////////////
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.user)

    /////////////////////////////////// STATES /////////////////////////////////////
    const [userData, setUserData] = useState({ firstName: '', lastName: '', username: '', phone: '', email: '', password: '' })

    /////////////////////////////////// USE EFFECTS ////////////////////////////////

    /////////////////////////////////// FUNCTIONS //////////////////////////////////
    const handleChange = (e) => {
        setUserData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!userData.firstName || !userData.lastName || !userData.username || !userData.phone || !userData.email || !userData.password) return alert('Make sure to provide all the fields')
        dispatch(createRequestApproval(userData))
    }

    return (
        <div>
            <div className='bg-gray-100 h-screen'>
                <div className='flex justify-center pt-8'>
                    <img className='w-41 h-11' src='/favicon/GrowLOGO.png' />
                </div>
                <div className='flex justify-center pt-6 pl-0 ml-0'>
                    <div className='w-96 h-auto bg-white shadow-xl rounded'>
                        <p className='text-xl text-slate-500 tracking-wide flex justify-center pt-6 font-Mulish'>Create New Account</p>
                        <p className='flex justify-center pt-2 font-Mulish text-slate-500 text-xs'>Sign up for your new account today!</p>
                        <form onSubmit={handleSubmit} className='w-auto pl-[2rem] pt-[8px]'>
                            <TextField name='firstName' value={userData.firstName} onChange={handleChange} label="First Name" variant="standard" className='w-[20rem]' type='text' />
                            <br />
                            <br />
                            <TextField name='lastName' value={userData.lastName} onChange={handleChange} label="Last Name" variant="standard" className='w-[20rem]' type='text' />
                            <br />
                            <br />
                            <TextField name='username' value={userData.username} onChange={handleChange} label="User Name" variant="standard" className='w-[20rem]' type='text' />
                            <br />
                            <br />
                            <TextField name='phone' value={userData.phone} onChange={handleChange} label="Phone Number" variant="standard" className='w-[20rem]' type='number' />
                            <br />
                            <br />
                            <TextField name='email' value={userData.email} onChange={handleChange} label="Email" variant="standard" className='w-[20rem]' type='email' />
                            <br />
                            <br />
                            <TextField name='password' value={userData.password} onChange={handleChange} label="Password" variant="standard" className='w-[20rem]' type='password' />
                            <br />
                            <br />
                            <Button type='submit' className='w-[20rem]' variant='contained'>
                                {isFetching ? 'Submitting...' : 'Sign Up'}
                            </Button>
                            <br />
                            <br />
                            <p className='font-Mulish font-thin text-slate-500 pl-10'>Already have an account?
                                <Link to='/login' className='text-blue-400'> Login</Link>
                            </p>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup