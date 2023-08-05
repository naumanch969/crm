import { Close, Description, Flag, PriorityHigh, Timeline } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import { register } from '../../../redux/action/user'
import { useDispatch, useSelector } from 'react-redux'

const Approval = ({ open, setOpen }) => {

    /////////////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { currentApproval: approval } = useSelector(state => state.approval)

    /////////////////////////////////////// STATES //////////////////////////////////////

    /////////////////////////////////////// USE EFFECTS //////////////////////////////////////

    /////////////////////////////////////// FUNCTIONS //////////////////////////////////////
    const handleApprove = () => {
        dispatch(register(approval?.data))
        setOpen(false)
    }
    const handleReject = () => {
        setOpen(false)
    }


    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

            <div className='w-[25vw] min-h-[60vh] h-auto max-h-[80vh] flex flex-col gap-[1rem] bg-white rounded-[4px] ' >

                <div className="flex justify-end items-center w-full bg-neutral-800  ">
                    <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
                </div>

                <div className="flex flex-col gap-[8px] px-[1rem] ">
                    <div className="flex gap-[8px] " >
                        <span className='text-[16px] text-gray-900 ' >First Name:</span>
                        <span className='text-[15px] text-gray-500 ' >{approval?.data?.firstName}</span>
                    </div>
                    <div className="flex gap-[8px] " >
                        <span className='text-[16px] text-gray-900 ' >Last Name:</span>
                        <span className='text-[15px] text-gray-500 ' >{approval?.data?.lastName}</span>
                    </div>
                    <div className="flex gap-[8px] " >
                        <span className='text-[16px] text-gray-900 ' >Username:</span>
                        <span className='text-[15px] text-gray-500 ' >{approval?.data?.username}</span>
                    </div>
                    <div className="flex gap-[8px] " >
                        <span className='text-[16px] text-gray-900 ' >Email:</span>
                        <span className='text-[15px] text-gray-500 ' >{approval?.data?.email}</span>
                    </div>
                    <div className="flex gap-[8px] " >
                        <span className='text-[16px] text-gray-900 ' >Phone:</span>
                        <span className='text-[15px] text-gray-500 ' >{approval?.data?.phone}</span>
                    </div>
                    <div className="flex gap-[8px] " >
                        <span className='text-[16px] text-gray-900 ' >Password:</span>
                        <span className='text-[15px] text-gray-500 ' >{approval?.data?.password}</span>
                    </div>
                    <div className="flex gap-[8px] " >
                        <span className='text-[16px] text-gray-900 ' >Submitted:</span>
                        <span className='text-[15px] text-gray-500 ' >{approval?.createdAt}</span>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-[8px] w-full px-[1rem] pb-[8px] " >
                    <button className='cursor-pointer bg-red-600 text-white px-[12px] py-[4px] rounded-[4px] text-[14x] ' onClick={handleReject} >Reject</button>
                    <button className='cursor-pointer bg-green-600 text-white px-[12px] py-[4px] rounded-[4px] text-[14x] ' onClick={handleApprove} >Approve</button>
                </div>


            </div>

        </Modal>
    )
}

export default Approval