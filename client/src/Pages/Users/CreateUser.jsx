import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEmployee } from '../../redux/action/user'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {

    //////////////////////////////////////// VARIABLES /////////////////////////////////////
    const { isFetching } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const stats = [
        { title: 'Allowed Users', numbers: 100 },
        { title: 'Blocked Users', numbers: 0 },
        { title: 'Active Users', numbers: 0 },
        { title: 'Remaining Quota', numbers: 100 },
    ]

    //////////////////////////////////////// STATES /////////////////////////////////////
    const [userData, setUserData] = useState({ firstName: '', lastName: '', username: '', email: '', password: '', cnic: '', phone: '', officialNumber: '', branch: '', gender: 'male', martialStatus: 'married', salaryType: '', activeStatus: false })

    //////////////////////////////////////// USE EFFECTS /////////////////////////////////////


    //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createEmployee(userData, navigate))
    }

    const handleChange = (e) => {
        e.target.type == 'checkbox'
            ? setUserData({ ...userData, [e.target.name]: e.target.checked })
            : setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    return (
        <div className='flex flex-col gap-[2rem] bg-white px-[20px] py-[1rem] shadow-box rounded-[4px] ' >

            <div className="flex lg:flex-nowrap flex-wrap justify-between gap-[24px] w-full">
                {
                    stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center lg:flex-[1] sm:w-[47%] w-full px-[2rem] py-[1rem] shadow-box rounded-[4px]  ">
                            <span className='text-gray-500 font-semibold text-[20px] text-center ' >{stat.title}</span>
                            <span className='text-[22px] font-semibold ' >{stat.numbers}</span>
                        </div>
                    ))
                }
            </div>



            <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full px-[2rem] py-[1rem] ' >

                <div className="w-full flex sm:flex-nowrap flex-wrap gap-[3rem]  ">
                    <div className="sm:w-[47%] md:w-[47.5%] w-full flex flex-col gap-[1rem]  ">
                        {/* firstname */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="firstName">First Name</label>
                            <input type="text" onChange={handleChange} value={userData.firstName} name="firstName" id="firstName" placeholder='First Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* username */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="username">User Name</label>
                            <input type="text" onChange={handleChange} value={userData.username} name="username" id="username" placeholder='User Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* email */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="email">Email</label>
                            <input type="email" onChange={handleChange} value={userData.email} name="email" id="email" placeholder='Email' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* official number */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="officialNumber">Official Number</label>
                            <input type="number" onChange={handleChange} value={userData.officialNumber} name="officialNumber" id="officialNumber" placeholder='Official Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* branch */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="branch">Select Branch</label>
                            <select onChange={handleChange} value={userData.branch} name="branch" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
                                <option value="">Select Branch</option>
                                <option value="lahore">Lahore</option>
                                <option value="islamabad">Islamabad</option>
                            </select>
                        </div>
                        {/* gender and martial status */}
                        <div className="flex justify-between items-center gap-[4px] ">
                            {/* gender */}
                            <div className="flex-[1] ">
                                <label className='text-black font-medium text-[16px] ' htmlFor='gender' >Gender</label>
                                <div className="flex gap-[8px] py-[8px] ">
                                    <div className="flex gap-[2px] ">
                                        <label className='text-gray-500 font-light text-[16px] ' htmlFor="male">Male</label>
                                        <input type="radio" onChange={handleChange} value={userData.gender} name="gender" id="male" />
                                    </div>
                                    <div className="flex gap-[2px] ">
                                        <label className='text-gray-500 font-light text-[16px]  ' htmlFor="female">Female</label>
                                        <input type="radio" onChange={handleChange} value={userData.gender} name="gender" id="female" />
                                    </div>
                                </div>
                            </div>
                            {/* martial status */}
                            <div className="flex-[1] ">
                                <label className='text-black font-medium text-[16px] ' htmlFor='gender' >Martial Status</label>
                                <div className="flex gap-[8px] py-[8px] ">
                                    <div className="flex gap-[2px] ">
                                        <label className='text-gray-500 font-light text-[16px] ' htmlFor="single">Single</label>
                                        <input type="radio" onChange={handleChange} value={userData.martialStatus} name="martialStatus" id="single" />
                                    </div>
                                    <div className="flex gap-[2px] ">
                                        <label className='text-gray-500 font-light text-[16px]  ' htmlFor="married">Married</label>
                                        <input type="radio" onChange={handleChange} value={userData.martialStatus} name="martialStatus" id="married" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="sm:w-[47%] md:w-[47.5%] w-full flex flex-col gap-[1rem]  ">
                        {/* last name */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="lastName">Last Name</label>
                            <input type="text" onChange={handleChange} value={userData.lastName} name="lastName" id="lastName" placeholder='Last Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* password */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="password">Password</label>
                            <input type="password" onChange={handleChange} value={userData.password} name="password" id="password" placeholder='Password' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* cnic */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="cnic">CNIC</label>
                            <input type="number" onChange={handleChange} value={userData.cnic} name="cnic" id="cnic" placeholder='Mobile Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* mobile number */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="phone">Mobile Number</label>
                            <input type="number" onChange={handleChange} value={userData.phone} name="phone" id="phone" placeholder='Mobile Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* salary type */}
                        <div className="flex flex-col gap-[4px] w-full ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="firstName">Salary Type</label>
                            <select onChange={handleChange} value={userData.salaryType} name="salaryType" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
                                <option value="">Select Salary Type</option>
                                <option value="payCheck">Pay Check</option>
                                <option value="online">Online</option>
                            </select>
                        </div>
                        {/* active and cnic */}
                        <div className="flex flex-col gap-[4px] w-full items-start ">
                            <label className='text-black font-medium text-[16px] ' htmlFor='activeStatus' >Active Status</label>
                            <div className="item-start h-[40px] ">
                                <input type="checkbox" onChange={handleChange} value={userData.activeStatus} name="activeStatus" id="activeStatus" className='' />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-full flex justify-end items-center">
                    <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
                        {isFetching ? 'Saving' : 'Save'}
                    </button>
                </div>


            </form>

        </div>
    )
}

export default CreateUser