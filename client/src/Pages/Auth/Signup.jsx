import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
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
                        <div className='w-auto pl-8 pt-2'>
                            <TextField id="standard-basic" label="First Name" variant="standard" className='w-80' type='text'  />
                            <br />
                            <br />
                            <TextField id="standard-basic" label="Last Name" variant="standard" className='w-80' type='text' />
                            <br />
                            <br />
                            <TextField id="standard-basic" label="User Name" variant="standard" className='w-80' type='text'  />
                            <br />
                            <br />
                            <TextField id="standard-basic" label="Phone Number" variant="standard" className='w-80' type='number' />
                            <br />
                            <br />
                            <TextField id="standard-basic" label="Email" variant="standard" className='w-80' type='email' />
                            <br />
                            <br />
                            <TextField id="standard-basic" label="Password" variant="standard" className='w-80' type='password' />
                            <br />
                            <br />
                            <Button className='w-80' variant='contained'>Sign Up</Button>
                            <br />
                            <br />
                            <p className='font-Mulish font-thin text-slate-500 pl-10'>Already have an account? 
                                <Link to='/login' className='text-blue-400'> Login</Link>
                            </p>
                            <br />
                        </div>
                    </div>
                </div>        
            </div>
    </div>
  )
}

export default Signup