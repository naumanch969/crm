import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTask } from '../../redux/action/task'
import { useLocation, useNavigate } from 'react-router-dom'
import Topbar from './Topbar'


const CreateTask = () => {

    ////////////////////////////////////// VARIABLES //////////////////////////////
    const { isFetching, error } = useSelector(state => state.task)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const stats = [
        { title: 'Completed', numbers: 100 },
        { title: 'Pending', numbers: 0 },
        { title: 'Delayed', numbers: 0 },
        { title: 'Started', numbers: 0 },
    ]

    ////////////////////////////////////// STATES ///////////////////////////////////
    const [taskData, setTaskData] = useState({ title: '', description: '', priority: '', dueDate: '' })

    ////////////////////////////////////// USE EFFECTS //////////////////////////////


    ////////////////////////////////////// FUNCTION /////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!taskData.title || !taskData.description || !taskData.dueDate) return alert('Make sure to rovide all the fields')
        dispatch(createTask(taskData, navigate))
    }

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }

    return (
        <div className="flex flex-col gap-[1rem] w-full">

            <Topbar  />

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

                <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full ' >

                    <div className="w-full flex sm:flex-nowrap flex-wrap gap-[3rem]  ">
                        <div className="sm:flex-[1] w-full flex flex-col gap-[1rem]  ">
                            {/* title */}
                            <div className="flex flex-col gap-[4px] w-full ">
                                <label className='text-black font-medium text-[16px] ' htmlFor="title">Title</label>
                                <input type="text" onChange={handleChange} value={taskData.title} name="title" id="title" placeholder='First Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                            </div>
                            {/* due date */}
                            <div className="flex flex-col gap-[4px] w-full ">
                                <label className='text-black font-medium text-[16px] ' htmlFor="dueDate">Due Date</label>
                                <input type="date" onChange={handleChange} value={taskData.dueDate} name="dueDate" id="dueDate" placeholder='Email' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                            </div>
                            {/* branch */}
                            <div className="flex flex-col gap-[4px] w-full ">
                                <label className='text-black font-medium text-[16px] ' htmlFor="priority">Priority</label>
                                <select onChange={handleChange} value={taskData.priority} name="priority" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
                                    <option value="">Select Priority</option>
                                    <option value="high">High</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:flex-[1] w-full flex flex-col gap-[1rem]  ">
                            {/* description */}
                            <div className="flex flex-col gap-[4px] w-full ">
                                <label className='text-black font-medium text-[16px] ' htmlFor="description">Description</label>
                                <textarea rows='9' type="text" onChange={handleChange} value={taskData.description} name="description" id="description" placeholder='Description' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                            </div>
                        </div>

                    </div>

                    <div className="w-full flex justify-end items-center">
                        <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
                            {isFetching ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default CreateTask