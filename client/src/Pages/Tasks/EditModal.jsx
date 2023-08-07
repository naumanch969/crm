import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useState } from 'react'
import React from 'react'
import { updateTask } from '../../redux/action/task'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskReducer } from '../../redux/reducer/task'

const EditModal = ({ open, setOpen }) => {

  ///////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch()
  const { currentTask: task, isFetchinig, error } = useSelector(state => state.task)

  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [taskData, setTaskData] = useState({ ...task })

  ///////////////////////////////////// USE EFFECTS ///////////////////////////////////


  ///////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskData?.title || !taskData?.description || !taskData?.dueDate || !taskData?.priority) return alert('Make sure to rovide all the fields')
    dispatch(updateTask(taskData?._id, taskData))
    dispatch(getTaskReducer(null))
    setOpen(false)
  }

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value })
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={handleClose} className='w-screen h-screen flex justify-center items-center ' >

      <div className='w-[30vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >


        <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
          <h2 className='font-bold text-[24px] ' >Update Task</h2>
          <IconButton onClick={handleClose} ><Close className='text-white' /></IconButton>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full p-[8px] ' >

          <div className=" flex flex-col gap-[1rem]  ">
            {/* title */}
            <div className="flex flex-col gap-[4px] w-full ">
              <label className='text-black font-medium text-[16px] ' htmlFor="title">Title</label>
              <input type="text" onChange={handleChange} value={taskData?.title} name="title" id="title" placeholder='First Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
            </div>
            {/* due date */}
            <div className="flex flex-col gap-[4px] w-full ">
              <label className='text-black font-medium text-[16px] ' htmlFor="dueDate">Due Date</label>
              <input type="date" onChange={handleChange} value={taskData?.dueDate} name="dueDate" id="dueDate" placeholder='Email' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
            </div>
            {/* branch */}
            <div className="flex flex-col gap-[4px] w-full ">
              <label className='text-black font-medium text-[16px] ' htmlFor="priority">Priority</label>
              <select onChange={handleChange} value={taskData?.priority} name="priority" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </div>
            {/* description */}
            <div className="flex flex-col gap-[4px] w-full ">
              <label className='text-black font-medium text-[16px] ' htmlFor="description">Description</label>
              <textarea rows='5' type="text" onChange={handleChange} value={taskData?.description} name="description" id="description" placeholder='Description' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
            </div>
          </div>

          <div className="w-full flex justify-end items-center">
            <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
              {isFetchinig ? 'Updating' : 'Save'}
            </button>
          </div>

        </form>



      </div>

    </Modal>
  )
}

export default EditModal