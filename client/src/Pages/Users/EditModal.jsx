import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useState } from 'react'
import React from 'react'
import { updateUser } from '../../redux/action/user'
import { useDispatch, useSelector } from 'react-redux'

const EditModal = ({ open, setOpen }) => {

  /////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch()
  const { currentUser: user, } = useSelector(state => state.user)
  const initialState = { firstName: '', lastName: '', username: '', email: '', password: '', cnic: '', phone: '', officialNumber: '', branch: '', gender: 'male', martialStatus: 'married', salaryType: '', activeStatus: false }

  /////////////////////////////////////// STATES ///////////////////////////////////////
  const [userData, setUserData] = useState(user ?? initialState)

  /////////////////////////////////////// USE EFFECT ///////////////////////////////////////

  /////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(user._id, userData, userData?.role))
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={handleClose} className='w-screen h-screen flex justify-center items-center ' >

      <div className='w-[70vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >


        <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
          <h2 className='font-bold text-[24px] ' >Update User</h2>
          <IconButton onClick={handleClose} ><Close className='text-white' /></IconButton>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full px-[2rem] py-[1rem] ' >

          <div className="w-full flex gap-[3rem]  ">
            <div className="flex-[1] flex flex-col gap-[1rem]  ">
              {/* firstname */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="firstName">First Name</label>
                <input type="text" onChange={handleChange} value={userData?.firstName} name="firstName" id="firstName" placeholder='First Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* username */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="username">User Name</label>
                <input type="text" onChange={handleChange} value={userData?.username} name="username" id="username" placeholder='User Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* email */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="email">Email</label>
                <input type="email" onChange={handleChange} value={userData?.email} name="email" id="email" placeholder='Email' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* official number */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="officialNumber">Official Number</label>
                <input type="number" onChange={handleChange} value={userData?.officialNumber} name="officialNumber" id="officialNumber" placeholder='Official Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* branch */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="branch">Select Branch</label>
                <select onChange={handleChange} value={userData?.branch} name="branch" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
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
                      <input type="radio" onChange={handleChange} value={userData?.gender} name="gender" id="male" />
                    </div>
                    <div className="flex gap-[2px] ">
                      <label className='text-gray-500 font-light text-[16px]  ' htmlFor="female">Female</label>
                      <input type="radio" onChange={handleChange} value={userData?.gender} name="gender" id="female" />
                    </div>
                  </div>
                </div>
                {/* martial status */}
                <div className="flex-[1] ">
                  <label className='text-black font-medium text-[16px] ' htmlFor='gender' >Martial Status</label>
                  <div className="flex gap-[8px] py-[8px] ">
                    <div className="flex gap-[2px] ">
                      <label className='text-gray-500 font-light text-[16px] ' htmlFor="single">Single</label>
                      <input type="radio" onChange={handleChange} value={userData?.martialStatus} name="martialStatus" id="single" />
                    </div>
                    <div className="flex gap-[2px] ">
                      <label className='text-gray-500 font-light text-[16px]  ' htmlFor="married">Married</label>
                      <input type="radio" onChange={handleChange} value={userData?.martialStatus} name="martialStatus" id="married" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex-[1] flex flex-col gap-[1rem]  ">
              {/* last name */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="lastName">Last Name</label>
                <input type="text" onChange={handleChange} value={userData?.lastName} name="lastName" id="lastName" placeholder='Last Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* password */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="password">Password</label>
                <input type="password" onChange={handleChange} value={userData?.password} name="password" id="password" placeholder='Password' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* cnic */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="mobileNumber">CNIC</label>
                <input type="number" onChange={handleChange} value={userData?.cnic} name="cnic" id="cnic" placeholder='Mobile Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* mobile number */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="mobileNumber">Mobile Number</label>
                <input type="number" onChange={handleChange} value={userData?.mobileNumber} name="mobileNumber" id="mobileNumber" placeholder='Mobile Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* salary type */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="firstName">Salary Type</label>
                <select onChange={handleChange} value={userData?.salaryType} name="salaryType" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
                  <option value="">Select Salary Type</option>
                  <option value="payCheck">Pay Check</option>
                  <option value="online">Online</option>
                </select>
              </div>
              {/* active and cnic */}
              <div className="flex flex-col gap-[4px] items-start ">
                <label className='text-black font-medium text-[16px] ' htmlFor='activeStatus' >Active Status</label>
                <div className="item-start h-[40px] ">
                  <input type="checkbox" onChange={handleChange} value={userData?.activeStatus} name="activeStatus" id="activeStatus" className='' />
                </div>
              </div>
            </div>
          </div>


          <div className="w-full flex justify-end items-center">
            <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[12px] py-[4px] rounded-[4px] cursor-pointer ' >
              Update
            </button>
          </div>


        </form>



      </div>

    </Modal>
  )
}

export default EditModal