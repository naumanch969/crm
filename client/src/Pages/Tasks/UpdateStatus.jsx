import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTask } from '../../redux/action/task'

const UpateStatusModal = ({ open, setOpen }) => {

    ////////////////////////////////////// VARIABLES  /////////////////////////////////////
    const dispatch = useDispatch()
    const { currentTask, isFetching } = useSelector(state => state.task)

    ////////////////////////////////////// STATES  /////////////////////////////////////
    const [status, setStatus] = useState(currentTask?.status)

    ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
    useEffect(() => {
        setStatus(currentTask?.status)
    }, [currentTask])


    ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateTask(currentTask?._id, { status }, setOpen))
    }
    const handleChange = (e) => {
        setStatus(e.target.value)
    }




    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

            <div className='w-[14rem] h-fit overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

                <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
                    <h2 className='font-bold text-[20px] ' >Update Status</h2>
                    <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
                </div>

                <form onSubmit={handleSubmit} className='w-full p-[10px] flex flex-col gap-[10px] ' >
                    <select className='w-full min-h-[40px] text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='status' value={status} onChange={handleChange} >
                        <option value="new">New</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="overDue">Over Due</option>
                    </select>
                    <div className="w-full flex justify-end items-center">
                        <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
                            {isFetching ? 'Updating' : 'Update'}
                        </button>
                    </div>
                </form>

            </div>

        </Modal>
    )
}

export default UpateStatusModal