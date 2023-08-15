import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/action/user'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import validator from 'email-validator'

const Signup = () => {

    /////////////////////////////////// VARIABLES /////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isFetching, error } = useSelector(state => state.user)

    /////////////////////////////////// STATES /////////////////////////////////////
    const [userData, setUserData] = useState({ firstName: '', lastName: '', username: '', phone: '', email: '', password: '' })
    const [inputError, setInputError] = useState({ firstName: '', lastName: '', username: '', phone: '', email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)

    /////////////////////////////////// USE EFFECTS ////////////////////////////////

    /////////////////////////////////// FUNCTIONS //////////////////////////////////
    const handleChange = (e) => {
        const { firstName, lastName, username, email, phone, password } = userData

        if (firstName.length > 3) setInputError(pre => ({ ...pre, firstName: '' }))
        if (lastName.length < 3) setInputError(pre => ({ ...pre, lastName: '' }))
        if (username.length < 3) setInputError(pre => ({ ...pre, username: '' }))
        if (validator.validate(email)) setInputError(pre => ({ ...pre, email: '' }))
        if (phone.length >= 10) setInputError(pre => ({ ...pre, phone: '' }))
        if (password.length > 6) setInputError(pre => ({ ...pre, password: '' }))

        setUserData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const { firstName, lastName, username, email, phone, password } = userData

        if (!firstName) return setInputError(pre => ({ ...pre, firstName: 'First Name is required' }))
        if (firstName.length < 3) return setInputError(pre => ({ ...pre, firstName: 'First Name should be atleast of 3 characters' }))
        if (!lastName) return setInputError(pre => ({ ...pre, lastName: 'Last Name is required' }))
        if (lastName.length < 3) return setInputError(pre => ({ ...pre, lastName: 'Last Name should be atleast of 3 characters' }))
        if (!username) return setInputError(pre => ({ ...pre, username: 'Username is required' }))
        if (username.length < 3) return setInputError(pre => ({ ...pre, username: 'Username should be atleast of 3 characters' }))
        if (!email) return setInputError(pre => ({ ...pre, email: 'Email is required' }))
        if (!validator.validate(email)) return setInputError(pre => ({ ...pre, email: 'Make sure to provide a valid email' }))
        if (!phone) return setInputError(pre => ({ ...pre, phone: 'Phone Number is required' }))
        if (phone.length < 10) return setInputError(pre => ({ ...pre, phone: 'Please provide a valid phone number' }))
        if (!password) return setInputError(pre => ({ ...pre, password: 'Password is required' }))
        if (password.length < 6) return setInputError(pre => ({ ...pre, password: 'Password must be of atleast 6 characters' }))

        dispatch(register(userData, navigate))
    }

    const handleToggleVisibility = (e) => {
        e.preventDefault()
        setShowPassword(pre => !pre)
    }


    return (
        <div className="py-[2rem] ">
            <div className='w-full h-full '>
                <div className='flex justify-center pt-8'>
                    <img className='w-41 h-11' src='/favicon/GrowLOGO.png' />
                </div>
                <div className='flex justify-center pt-6 pl-0 ml-0'>
                    <div className='w-96 h-auto shadow-xl rounded'>
                        <p className='text-xl text-slate-500 tracking-wide flex justify-center pt-6 font-Mulish'>Create New Account</p>
                        <p className='flex justify-center pt-2 font-Mulish text-slate-500 text-xs'>Sign up for your new account today!</p>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[12px] w-auto pl-[2rem] pt-[1rem] '>
                            <div className="flex flex-col ">
                                <input type='text' name='firstName' value={userData.firstName} onChange={handleChange} placeholder="First Name" variant="standard" className='w-[20rem] h-[40px] px-[8px] border-[1px] border-neutral-500 text-neutral-700 rounded-[4px] ' />
                                {inputError.firstName && <span className='text-[12px] text-red-600 ' >{inputError.firstName}</span>}
                            </div>
                            <div className="flex flex-col ">
                                <input type='text' name='lastName' value={userData.lastName} onChange={handleChange} placeholder="Last Name" variant="standard" className='w-[20rem] h-[40px] px-[8px] border-[1px] border-neutral-500 text-neutral-700 rounded-[4px] ' />
                                {inputError.lastName && <span className='text-[12px] text-red-600 ' >{inputError.lastName}</span>}
                            </div>
                            <div className="flex flex-col ">
                                <input type='text' name='username' value={userData.username} onChange={handleChange} placeholder="Username" variant="standard" className='w-[20rem] h-[40px] px-[8px] border-[1px] border-neutral-500 text-neutral-700 rounded-[4px] ' />
                                {inputError.username && <span className='text-[12px] text-red-600 ' >{inputError.username}</span>}
                            </div>
                            <div className="flex flex-col ">
                                <input type='number' name='phone' value={userData.phone} onChange={handleChange} placeholder="Phone" variant="standard" className='w-[20rem] h-[40px] px-[8px] border-[1px] border-neutral-500 text-neutral-700 rounded-[4px] ' />
                                {inputError.phone && <span className='text-[12px] text-red-600 ' >{inputError.phone}</span>}
                            </div>
                            <div className="flex flex-col ">
                                <input type='email' name='email' value={userData.email} onChange={handleChange} placeholder="Email" variant="standard" className='w-[20rem] h-[40px] px-[8px] border-[1px] border-neutral-500 text-neutral-700 rounded-[4px] ' />
                                {inputError.email && <span className='text-[12px] text-red-600 ' >{inputError.email}</span>}
                            </div>
                            <div className="flex flex-col relative w-fit ">
                                <input type={showPassword ? 'text' : 'password'} name='password' value={userData.password} onChange={handleChange} placeholder="Password" variant="standard" className='w-[20rem] h-[40px] px-[8px] border-[1px] border-neutral-500 text-neutral-700 rounded-[4px] ' />
                                <button onClick={handleToggleVisibility} className="absolute top-[50%] right-[4px] transform translate-y-[-50%] cursor-pointer">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </button>
                                {inputError.password && <span className='text-[12px] text-red-600 ' >{inputError.password}</span>}
                            </div>
                            <Button type='submit' className='w-[20rem]' variant='contained'>
                                {isFetching ? 'Submitting...' : 'Sign Up'}
                            </Button>
                            {error && <span className='text-[12px] text-red-600 text-center w-full ' >{error}</span>}
                            <p className='font-Mulish font-thin text-slate-500 pl-10'>Already have an account?
                                <Link to='/auth/login' className='text-blue-400'> Login</Link>
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